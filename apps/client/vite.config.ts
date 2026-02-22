import svgSpritePlugin from '@pivanov/vite-plugin-svg-sprite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

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
    host: true,
    proxy: {
      '/s3-proxy': {
        target: 'https://confeti-s3-prod.s3.ap-northeast-2.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/s3-proxy/, ''),
      },
    },
  },
});
