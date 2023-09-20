/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        paradiso: {
          50: "#f3faf9",
          100: "#d7f0ed",
          200: "#afe0db",
          300: "#7ecac5",
          400: "#54adaa",
          500: "#3a9290",
          600: "#318181",
          700: "#275d5e",
          800: "#234b4c",
          900: "#213f40",
          950: "#0e2425",
        },
      },
    },
  },
  plugins: [],
};
