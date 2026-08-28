// app/tailwind.config.js

module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        slab: ["Roboto Slab", "serif"],
        sans: ["Figtree", "sans-serif"],
      },
    },
  },
  plugins: [],
};