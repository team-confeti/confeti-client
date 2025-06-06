/* global module */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['simple-import-sort'],
  parser: '@typescript-eslint/parser',
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

    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^node:'],
          ['^react', '^@?\\w'],
          ['^@confeti/', '^@shared/'],
          ['^\\u0000'],
          ['^\\.'],
          ['^.+\\.css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
  },
};
