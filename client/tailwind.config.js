/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      roboto: ["Roboto Condensed", "sans-serif"],
    },
  },
  daisyui: {
    themes: ["pastel", "night"],
  },
  plugins: [daisyui],
};
