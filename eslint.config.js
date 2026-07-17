import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
  {
    // shadcn/ui components are vendor-generated (via the shadcn CLI) rather
    // than hand-written app code -- they're not edited directly day-to-day,
    // and could be regenerated/overwritten by the CLI in future. These two
    // rules both flag shadcn's own standard patterns (an empty interface
    // extending a base props type as a documented extension point; a file
    // exporting both a component and a small constant/helper like
    // `buttonVariants`), so they're relaxed here rather than restructuring
    // generated code to work around them.
    files: ["src/components/ui/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      "react-refresh/only-export-components": "off",
    },
  },
);