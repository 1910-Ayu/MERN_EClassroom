/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xl: { max: "1500px" },
        lg: { max: "1023px" },
        md: { max: "767px" },
        sm: { max: "639px" },
      },
    },
  },
  plugins: [],
});
