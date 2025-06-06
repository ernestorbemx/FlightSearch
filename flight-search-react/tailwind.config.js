import { heroui } from "@heroui/react";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(card|button|snippet|code|input).js",
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
};
