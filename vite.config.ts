import { sentryVitePlugin } from "@sentry/vite-plugin";
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react(), sentryVitePlugin({
    org: "innovento-llc",
    project: "pos"
  })],
  server: {
    open: true, // automatically open the app in the browser
    port: 3000,
  },
  resolve: {
    alias: {
      screens: path.resolve(__dirname, './src/screens'),
    },
  },
  build: {
    outDir: 'build',
    sourcemap: true
  },
});