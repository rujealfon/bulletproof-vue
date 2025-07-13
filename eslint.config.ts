import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import pluginPlaywright from 'eslint-plugin-playwright'
import pluginOxlint from 'eslint-plugin-oxlint'
import pluginImport from 'eslint-plugin-import'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  
  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },

  // Module boundary enforcement rules
  {
    name: 'app/module-boundaries',
    files: ['src/features/**/*.{ts,vue}'],
    plugins: {
      import: pluginImport,
    },
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // Prevent features from importing from other features
            {
              target: './src/features/*/!(index.ts)',
              from: './src/features',
              except: ['./src/features/$1'],
              message: 'Features should not import from other features directly. Use the feature\'s index.ts file instead.',
            },
            // Prevent features from importing from app layer
            {
              target: './src/features/**/*',
              from: './src/app',
              message: 'Features should not import from the app layer.',
            },
          ],
        },
      ],
    },
  },

  ...pluginOxlint.configs['flat/recommended'],
  skipFormatting,
)
