import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin(), tsconfigPaths()],
  resolve: {
    alias: [{ find: '~', replacement: './src' }],
  },
  server: {
    port: 3000,
    proxy: {
      '/s3-proxy': {
        target: 'https://confeti-s3-prod.s3.ap-northeast-2.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/s3-proxy/, ''),
      },
    },
  },
});
