import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// Plugin to copy index.html to 404.html after build
const copy404Plugin = () => ({
  name: 'copy-404',
  closeBundle() {
    const indexPath = path.resolve(__dirname, 'dist/index.html');
    const notFoundPath = path.resolve(__dirname, 'dist/404.html');
    if (fs.existsSync(indexPath)) {
      fs.copyFileSync(indexPath, notFoundPath);
      console.log('✅ Copied index.html to 404.html');
    }
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/', // Changed from '/lumina/' for custom domain
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), copy404Plugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
