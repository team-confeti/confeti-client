import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type UserConfig } from 'vite';

export default defineConfig(async (): Promise<UserConfig> => {
  const { default: svgSpritePlugin } = await import(
    '@pivanov/vite-plugin-svg-sprite'
  );

  return {
    plugins: [
      react(),
      vanillaExtractPlugin({
        identifiers: ({ hash }) => `_${hash}`,
      }),
      svgSpritePlugin({
        iconDirs: ['src/icons/assets/sprites'],
        symbolId: 'icon-[name]',
        inject: 'body-last',
      }),
    ],
    build: {
      outDir: 'dist',
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'DesignSystem',
        formats: ['es'],
        fileName: () => 'index.js',
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
      },
    },
  };
});
