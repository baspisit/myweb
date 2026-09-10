import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fetchAllNodes } from './scripts/lab-monitor.ts';

function labApiPlugin(): Plugin {
  return {
    name: 'lab-cluster-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/lab-pc-status')) {
          try {
            const url = new URL(req.url, 'http://localhost');
            const forceRefresh = url.searchParams.get('refresh') === 'true';
            const data = await fetchAllNodes(forceRefresh);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify(data));
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Internal error';
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: message }));
          }
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), labApiPlugin()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
