/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themeColour: "#99BFF2",
        cartBg: "rgba(255, 255, 255, 0.38)",
      },
      width: {
        512: "32rem",
        608: "38rem",
      },
      gridTemplateColumns: {
        "2.2fr1fr": "2.2fr 1fr",
      },
    },
  },
  plugins: [],
};
