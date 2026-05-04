import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import path from "path";
import runableAnalyticsPlugin from "./vite/plugins/runable-analytics-plugin";

export default defineConfig({
        plugins: [react(), runableAnalyticsPlugin(), tailwind()],
        resolve: {
                alias: {
                        "@": path.resolve(__dirname, "./src/web"),
                },
        },
        server: {
                host: "0.0.0.0",
                port: 5000,
                allowedHosts: true,
                hmr: { overlay: false },
                proxy: {
                        "/api": {
                                target: "http://localhost:3001",
                                changeOrigin: true,
                        },
                },
        },
});
