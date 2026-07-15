/**
 * Safe browser storage wrapper.
 *
 * WHY THIS EXISTS:
 * Calling `localStorage.getItem/setItem/removeItem` directly can throw in a
 * handful of real situations: Safari private browsing (historically),
 * storage quota exceeded, or a browser extension / enterprise policy
 * blocking storage access entirely. A raw call that throws inside a click
 * handler crashes that interaction (e.g. "Accept Cookies" silently doing
 * nothing); a raw call that throws during render can take down the whole
 * page in the absence of an error boundary.
 *
 * Every read/write of browser storage in this app should go through this
 * module instead of calling `localStorage.*` directly, so a blocked or
 * unavailable storage layer degrades to an in-memory fallback for the
 * current page session instead of crashing anything. The in-memory
 * fallback is intentionally NOT persisted across reloads -- if storage is
 * blocked, we accept that preferences won't survive a refresh rather than
 * pretending they will.
 *
 * This also implements zustand's `StateStorage` shape (getItem/setItem/
 * removeItem all returning synchronously), so it can be dropped straight
 * into `persist()` via `createJSONStorage(() => storage)` for any zustand
 * store, getting the same safety net without extra wiring.
 */

// In-memory fallback used only when real storage is unavailable or throws.
const memoryFallback = new Map<string, string>();

// Cache the availability check -- we don't want to re-run a probe write on
// every single get/set call.
let cachedAvailability: boolean | null = null;

function isStorageAvailable(): boolean {
  if (cachedAvailability !== null) return cachedAvailability;

  try {
    const testKey = "__lumina_storage_probe__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    cachedAvailability = true;
  } catch {
    cachedAvailability = false;
  }

  return cachedAvailability;
}

function warnUnavailableOnce(): void {
  if (import.meta.env.DEV) {
    console.warn(
      "[storage] localStorage is unavailable or blocked in this browser session. " +
        "Falling back to in-memory storage -- values will not persist across reloads."
    );
  }
}

export const storage = {
  /**
   * Read a raw string value. Returns null if the key doesn't exist or
   * storage is unavailable.
   */
  getItem(key: string): string | null {
    if (isStorageAvailable()) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        cachedAvailability = false;
        warnUnavailableOnce();
      }
    }
    return memoryFallback.get(key) ?? null;
  },

  /**
   * Write a raw string value. Returns true if it was actually persisted to
   * localStorage, false if it fell back to the in-memory store.
   */
  setItem(key: string, value: string): boolean {
    if (isStorageAvailable()) {
      try {
        window.localStorage.setItem(key, value);
        memoryFallback.delete(key);
        return true;
      } catch {
        cachedAvailability = false;
        warnUnavailableOnce();
      }
    }
    memoryFallback.set(key, value);
    return false;
  },

  /**
   * Remove a key. Never throws.
   */
  removeItem(key: string): void {
    if (isStorageAvailable()) {
      try {
        window.localStorage.removeItem(key);
      } catch {
        cachedAvailability = false;
        warnUnavailableOnce();
      }
    }
    memoryFallback.delete(key);
  },

  /**
   * Wipe everything -- used by the footer's "Clear cache" support action.
   * Never throws.
   */
  clearAll(): void {
    if (isStorageAvailable()) {
      try {
        window.localStorage.clear();
      } catch {
        cachedAvailability = false;
        warnUnavailableOnce();
      }
    }
    memoryFallback.clear();
  },

  /**
   * Convenience helper for JSON-shaped values (recently viewed products,
   * etc). Returns `fallback` (default: null) if the key is missing, storage
   * is unavailable, or the stored value fails to parse -- a corrupted or
   * hand-edited localStorage entry should never crash the app.
   */
  getJSON<T>(key: string, fallback: T | null = null): T | null {
    const raw = this.getItem(key);
    if (raw === null) return fallback;

    try {
      return JSON.parse(raw) as T;
    } catch {
      if (import.meta.env.DEV) {
        console.warn(`[storage] Failed to parse stored JSON for key "${key}"; ignoring it.`);
      }
      return fallback;
    }
  },

  /**
   * Convenience helper to JSON-stringify and store a value. Returns true if
   * it was actually persisted to localStorage, false if it fell back to
   * in-memory (storage unavailable) or the value could not be serialized.
   */
  setJSON(key: string, value: unknown): boolean {
    try {
      const raw = JSON.stringify(value);
      return this.setItem(key, raw);
    } catch {
      if (import.meta.env.DEV) {
        console.warn(`[storage] Failed to serialize value for key "${key}"; not stored.`);
      }
      return false;
    }
  },
};
