/**
 * Judge.me TypeScript declarations
 */

interface JudgeMeWindow extends Window {
  jdgm?: {
    customizeBadges: () => void;
    [key: string]: any;
  };
}

declare global {
  interface Window {
    jdgm?: {
      customizeBadges: () => void;
      [key: string]: any;
    };
  }
}

export {};

