import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, ".env") });

export default defineConfig({
  plugins: [reactRefresh()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
