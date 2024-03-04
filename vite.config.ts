import react from '@vitejs/plugin-react';
import path from 'path';
import colors from 'picocolors';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import legacy from 'vite-plugin-legacy-swc';
import mockDevServerPlugin from 'vite-plugin-mock-dev-server';
import progress from 'vite-plugin-progress';
import removeConsole from 'vite-plugin-remove-console';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const configEnv = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      checker({
        // e.g. use TypeScript check
        typescript: true,
        eslint: {
          // for example, lint .ts and .tsx
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        },
      }),
      configEnv.VITE_APP_USE_MOCK === 'true' ? mockDevServerPlugin() : null,
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      chunkSplitPlugin(),
      progress({
        format: `${colors.green(colors.bold('Bouilding'))} ${colors.cyan(
          '[:bar]'
        )} :percent`,
        total: 200,
        width: 60,
        complete: '=',
        incomplete: '',
      }),
      removeConsole(),
    ],
    base: configEnv.VITE_APP_BASE_URL,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      proxy: {
        [configEnv.VITE_APP_API_PREFIX]: {
          target: configEnv.VITE_APP_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(configEnv.VITE_APP_API_PREFIX, ''),
        },
      },
    },
  };
});
