import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
            '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
            '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
            '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
            '@theme': fileURLToPath(new URL('./src/theme', import.meta.url)),
            '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
            '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
            '@context': fileURLToPath(new URL('./src/context', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url))
        }
    }
});
