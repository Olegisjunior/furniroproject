/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      mont: ["Montserrat"],
      Poppins: ["Poppins"],
    },
    screens: {
      md: "1024px",
      l: "1280px",
      xl: "1440px",
    },
    extend: {},
  },
  plugins: [],
};
