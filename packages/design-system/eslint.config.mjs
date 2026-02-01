import baseConfig from '@confeti/eslint/base';

export default [
  ...baseConfig,
  {
    ignores: ['dist/**', 'build/**', 'coverage/**', 'node_modules/**'],
  },
];
