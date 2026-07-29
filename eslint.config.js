import { globalIgnores } from 'eslint/config'
import { withVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'
import tailwind from 'eslint-plugin-tailwindcss'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default withVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores(['**/dist/**']),

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.strict,
  vueTsConfigs.stylistic,

  // stylistic
  stylistic.configs['recommended'],

  {
    files: ['**/*.{vue,ts,mts,tsx}'],
    extends: [tailwind.configs.recommended],
    settings: {
      tailwindcss: {
        cssConfigPath: './src/assets/main.css',
      },
    },
  },

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/*.test.ts'],
  },
)
