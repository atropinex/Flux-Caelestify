
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()],
        build: {
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'scripts/ui/mainindex.ts'),
                },
            },
        },
    },
    preload: {
        plugins: [externalizeDepsPlugin()],
        build: {
            rollupOptions: {
                input: {
                    preloadindex: resolve(__dirname, 'scripts/preload/preloadindex.ts'),
                },
            },
        },
    },
    renderer: {
        root: resolve(__dirname, 'scripts/ui'),
        plugins: [react()],
        build: {
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'scripts/ui/index.html'),
                },
            },
        },
    },
});
