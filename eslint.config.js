/* eslint-env node */

import js from "@eslint/js";
import ts from "typescript-eslint";
import vue from "eslint-plugin-vue";
import prettier from "eslint-plugin-prettier/recommended";
import tailwind from "eslint-plugin-tailwindcss";

export default [
  {
    ignores: ["dist/"],
  },
  // javascript
  js.configs.recommended,
  {
    rules: {
      // "no-unused-vars": "off",
      // "no-undef": "off",
    },
  },

  // typescript
  ...ts.configs.recommended,
  {
    rules: {
      // "@typescript-eslint/no-unused-vars": "warn",
      // "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // vue
  ...vue.configs["flat/recommended"],
  {
    files: ["*.vue", "**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },

  // tailwind
  ...tailwind.configs["flat/recommended"],

  // prettier
  prettier,
  {
    rules: {
      "prettier/prettier": "warn",
    },
  },
];
