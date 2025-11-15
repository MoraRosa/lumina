# 🖼️ Image Setup Guide for Lumina Skincare

## 📁 Where to Place Your Images

All your branding images should go in the **`public/`** folder at the root of your project.

### Recommended File Structure:

```
lumina/
├── public/
│   ├── favicon.ico          ← Replace with your favicon
│   ├── logo.svg             ← Add your logo here (SVG preferred)
│   ├── logo.png             ← Or PNG if you don't have SVG
│   ├── og-image.png         ← Add your Open Graph image
│   ├── placeholder.svg      ← (existing file, can keep or delete)
│   └── robots.txt           ← (existing file, keep)
```

---

## 🎨 Image Specifications

### 1. **Favicon** (`favicon.ico`)
- **Size:** 32x32px or 64x64px
- **Format:** `.ico` (preferred) or `.png`
- **Purpose:** Browser tab icon
- **Location:** `public/favicon.ico`

### 2. **Logo** (`logo.svg` or `logo.png`)
- **Size:** 400x400px (or larger for high-DPI displays)
- **Format:** `.svg` (preferred for scalability) or `.png`
- **Purpose:** Navbar logo, general branding
- **Location:** `public/logo.svg` or `public/logo.png`
- **Tip:** SVG is best because it scales perfectly at any size

### 3. **Open Graph Image** (`og-image.png`)
- **Size:** 1200x630px (standard for social media)
- **Format:** `.png` or `.jpg`
- **Purpose:** Preview image when sharing on social media (Facebook, Twitter, LinkedIn, etc.)
- **Location:** `public/og-image.png`
- **Tip:** Include your logo and a tagline like "Gentle Skincare for Sensitive Skin"

---

## 🔧 After Adding Images - Update `index.html`

Once you've added your images to the `public/` folder, you'll need to update `index.html` to reference them.

### Current `index.html` references:
```html
<!-- Favicon (line ~5) -->
<link rel="icon" type="image/x-icon" href="/favicon.ico" />

<!-- Open Graph Image (line ~13) -->
<meta property="og:image" content="/og-image.png" />
```

### If you want to add your logo to the Navbar:

**Option 1: Replace the sparkle emoji with your logo**

Edit `src/components/Navbar.tsx` (around line 18):

```tsx
{/* Replace this: */}
<div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
  <span className="text-xl sm:text-2xl">✨</span>
</div>

{/* With this: */}
<div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
  <img src="/logo.svg" alt="Lumina Logo" className="w-full h-full object-contain" />
</div>
```

---

## ✅ Quick Checklist

- [ ] Add `favicon.ico` to `public/` folder
- [ ] Add `logo.svg` (or `logo.png`) to `public/` folder
- [ ] Add `og-image.png` to `public/` folder
- [ ] Verify `index.html` references the correct paths
- [ ] (Optional) Update Navbar to use your logo instead of emoji
- [ ] Test by refreshing your browser

---

## 🎯 Why the `public/` Folder?

Files in the `public/` folder are:
- ✅ Served at the root URL (e.g., `/logo.svg`)
- ✅ Not processed by Vite (no bundling/optimization)
- ✅ Perfect for static assets like favicons, logos, and OG images
- ✅ Accessible directly via URL in production

---

## 🚀 Next Steps

After adding your images:
1. Refresh your browser to see the new favicon
2. Check the browser tab for your favicon
3. Share your site URL on social media to test the OG image
4. (Optional) Update the Navbar to use your logo

**Need help?** Just ask! 💖

