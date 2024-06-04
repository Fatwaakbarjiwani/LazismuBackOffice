import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/lazismubackoffice/", // Base URL di mana aplikasi Anda akan di-host
  build: {
    outDir: "dist", // Direktori output untuk build aplikasi
    assetsDir: "assets", // Direktori di mana file aset (seperti gambar) akan disalin ke dalam output build
    emptyOutDir: true, // Bersihkan direktori output sebelum setiap build
  },
});
