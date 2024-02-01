/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "amber-50": "#FFF9EB",
        "amber-100": "#FEF6E1",
        vanilla: "#FFFEF8",
        "purple-light": "#F3F2F5",
        "purple-dark": "#A59EB2",
        "gray-secondary": {
          50: "#f7f7f5",
          100: "#edece7",
          200: "#dbe0e2",
          300: "#c2ccce",
          400: "#9eadb2",
        },
      },
      fontSize: {
        md: "15px",
      },
      lineHeight: {
        tighter: "1.15",
      },

      keyframes: {
        infiniteScroll: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },

      animation: {
        infiniteScroll: "infiniteScroll 60s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
