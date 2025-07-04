/** @type {import('tailwindcss').Config} */
const config = {
  plugins: ["@tailwindcss/postcss"],

  theme: {
    extend: {
      colors: {
        primary: "#006D77",     // Caribbean Current
        secondary: "#83C5BE",   // Tiffany Blue
        accent: "#E29578",      // Atomic Tangerine
        background: "#EDF6F9",  // Alice Blue
        muted: "#FFDDD2",       // Pale Dogwood
      },
    },
  },
};

export default config;
