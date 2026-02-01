import baseConfig from '@confeti/eslint/base';

export default [
  ...baseConfig,
  {
    ignores: [
      'dist/**',
      'build/**',
      '.next/**',
      'coverage/**',
      'public/**',
      'node_modules/**',
    ],
  },
];
