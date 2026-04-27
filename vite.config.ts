import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import geminiLiveTokenHandler from './api/gemini-live-token';

function localApiPlugin() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use('/api/gemini-live-token', async (req, res) => {
        const response = {
          setHeader: res.setHeader.bind(res),
          status(statusCode: number) {
            res.statusCode = statusCode;
            return response;
          },
          json(body: unknown) {
            if (!res.headersSent) {
              res.setHeader('Content-Type', 'application/json');
            }

            res.end(JSON.stringify(body));
            return response;
          },
        };

        try {
          await geminiLiveTokenHandler(req, response);
        } catch (error) {
          server.config.logger.error(error instanceof Error ? error.stack ?? error.message : String(error));

          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Internal server error' }));
          }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  for (const [key, value] of Object.entries(env)) {
    process.env[key] ??= value;
  }

  return {
    plugins: [react(), tailwindcss(), localApiPlugin()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'motion-vendor': ['motion', 'motion/react', 'motion/react-m'],
            'supabase-vendor': ['@supabase/supabase-js'],
            'icons-vendor': ['lucide-react'],
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
