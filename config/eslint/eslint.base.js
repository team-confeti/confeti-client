import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';

export default [
  // Base ESLint recommended rules
  js.configs.recommended,

  // Global configuration
  {
    files: [
      '**/*.js',
      '**/*.jsx',
      '**/*.ts',
      '**/*.tsx',
      '**/*.mjs',
      '**/*.cjs',
    ],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      '@typescript-eslint': typescriptPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      prettier: prettierPlugin,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      // Prettier integration
      'prettier/prettier': ['error', { endOfLine: 'auto' }],

      // TypeScript recommended rules
      ...typescriptPlugin.configs.recommended.rules,
      ...typescriptPlugin.configs['eslint-recommended'].overrides[0].rules,

      // React recommended rules
      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // React Hooks rules
      ...reactHooksPlugin.configs.recommended.rules,

      // TypeScript custom rules
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_|^args$' },
      ],

      // es-toolkit restriction
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'es-toolkit',
              message:
                'es-toolkit은 직접 import 하지 말고 shared/lib/es-toolkit/es.ts를 통해 사용해요.',
            },
          ],
          patterns: [
            {
              group: ['es-toolkit/*'],
              message:
                'es-toolkit은 직접 import 하지 말고 shared/lib/es-toolkit/es.ts를 통해 사용해요.',
            },
          ],
        },
      ],

      // Import sorting
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^node:'],
            ['^react$', '^@?\\w'],
            ['^@confeti/'],
            ['^@shared/'],
            ['^@pages/'],
            ['^\\u0000'],
            ['^\\.'],
            ['^.+\\.css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },

  // Prettier config (disables conflicting rules)
  prettierConfig,

  // Override for es-toolkit/es.ts
  {
    files: ['**/shared/lib/es-toolkit/es.ts'],
    rules: {
      '@typescript-eslint/no-restricted-imports': 'off',
    },
  },
];
