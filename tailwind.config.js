/** @type {import('tailwindcss').Config} */
export default {
  // ★ content 경로가 정확해야 Tailwind가 클래스를 찾아 빌드합니다.
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
