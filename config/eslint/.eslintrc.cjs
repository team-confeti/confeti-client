/* global module */
module.exports = {
  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint', 'react', 'simple-import-sort'],

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
  ],

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_|^args$' },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['es-toolkit', 'es-toolkit/*'],
            message:
              'es-toolkit은 직접 import하지 말고 shared/lib/es-toolkit/es.ts를 통해 사용해요.',
          },
        ],
      },
    ],

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
  overrides: [
    {
      files: ['**/shared/lib/es-toolkit/es.ts'],
      rules: {
        '@typescript-eslint/no-restricted-imports': 'off',
      },
    },
  ],
};
