/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": "/src",
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "https://seller-department.ru",
                changeOrigin: true,
                secure: true,
                ws: true,
            },
            "/static": {
                target: "https://seller-department.ru",
                changeOrigin: true,
                secure: true,
            },
        },
        // proxy: {
        //   "/api": {
        //     target: "http://localhost:8085",
        //     rewrite: (path) => path.replace(/^\/api/, ""),
        //     changeOrigin: true,
        //     secure: false,
        //     ws: true,
        //   },
        //   "/static": {
        //     target: "https://seller-department.ru",
        //     //rewrite: (path) => path.replace(/^\/static/, ""),
        //     changeOrigin: true,
        //     secure: false,
        //   },
        // },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
    },
});
