// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // ЛЮБОЙ запрос, начинающийся с /api, уходит на бэкенд
      "/api": {
        target: "https://api.yordam.glob.uz",
        changeOrigin: true,
        secure: true,
        // /api/ru/api/v1/...  ->  /ru/api/v1/... на бекенде
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
