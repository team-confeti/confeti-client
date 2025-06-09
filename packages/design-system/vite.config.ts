import svgSpritePlugin from '@pivanov/vite-plugin-svg-sprite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
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
});
