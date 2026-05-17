import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// User site (lpyhdzx.github.io): BASE_PATH=/
// Project site (lpyhdzx.github.io/peiyu-homepage): BASE_PATH=/peiyu-homepage/
export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react(), tailwindcss()],
});