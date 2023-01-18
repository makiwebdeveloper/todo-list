const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      neutral: colors.neutral,
      rose: colors.rose,
      pink: colors.pink,
      purple: colors.purple,
      blue: colors.blue,
      green: colors.green,
      red: colors.red,
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
  darkMode: "class",
};
