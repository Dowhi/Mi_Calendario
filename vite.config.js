import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
    root: 'docs',
    server: {
        port: 3000,
        open: true,
        hmr: false,
        // Custom middleware to serve large Flutter files as-is
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (req.url.endsWith('main.dart.js') || req.url.endsWith('flutter.js')) {
                    const filePath = path.join(process.cwd(), 'docs', req.url.split('?')[0]);
                    if (fs.existsSync(filePath)) {
                        res.setHeader('Content-Type', 'application/javascript');
                        res.end(fs.readFileSync(filePath));
                        return;
                    }
                }
                next();
            });
        }
    },
    plugins: [
        {
            name: 'flutter-fixer',
            transformIndexHtml(html) {
                return html.replace(
                    /<base href=".*?" \/>/,
                    '<base href="/" />'
                );
            }
        },
    ],
});
