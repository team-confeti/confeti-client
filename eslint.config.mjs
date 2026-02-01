import baseConfig from '@confeti/eslint/base';

export default [
  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/.next/**',
      '**/out/**',
      '**/.cache/**',
      '**/.eslintcache',
      '**/pnpm-lock.yaml',
      '**/package-lock.json',
      '**/yarn.lock',
    ],
  },

  // Apply base config
  ...baseConfig,
];
