import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Vercel은 루트(/)로 서빙하므로 base 설정 불필요.
  // GitHub Pages(하위경로)에 올릴 때만 base: "/저장소명/" 추가하세요.
});
