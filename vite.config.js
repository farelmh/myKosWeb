import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
    plugins: [laravel({
        input: 'resources/js/app.jsx',
        refresh: true,
    }), react(), cloudflare()],
});