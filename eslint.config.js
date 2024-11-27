/* eslint-env node */

import js from '@eslint/js'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import tailwind from 'eslint-plugin-tailwindcss'

export default ts.config(
  {
    ignores: ['dist/'],
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
  ts.configs.strict,
  ts.configs.stylistic,
  {
    rules: {
      // "@typescript-eslint/no-unused-vars": "warn",
      // "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // vue
  vue.configs['flat/recommended'],
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },

  // tailwind
  tailwind.configs['flat/recommended'],

  // stylistic
  stylistic.configs['recommended-flat'],
)
