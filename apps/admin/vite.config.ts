import svgSpritePlugin from '@pivanov/vite-plugin-svg-sprite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    tsconfigPaths(),
    svgSpritePlugin({
      iconDirs: [
        resolve(
          __dirname,
          '../../packages/design-system/src/icons/assets/sprites',
        ),
      ],
      symbolId: 'icon-[name]',
      inject: 'body-last',
    }),
  ],
  resolve: {
    alias: [{ find: '~', replacement: './src' }],
  },
  server: {
    port: 3000,
  },
});
