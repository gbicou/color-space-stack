import js from '@eslint/js'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import tailwind from 'eslint-plugin-tailwindcss'
import vueTsEslintConfig from '@vue/eslint-config-typescript'

export default ts.config(
  {
    ignores: ['dist/'],
  },

  // javascript
  js.configs.recommended,

  // typescript
  ts.configs.strict,
  ts.configs.stylistic,

  // vue
  vue.configs['flat/recommended'],
  vueTsEslintConfig(),

  // tailwind
  tailwind.configs['flat/recommended'],

  // stylistic
  stylistic.configs['recommended-flat'],
)
