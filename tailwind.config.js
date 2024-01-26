/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js,css}"],
  theme: {
    extend: {
      backgroundImage: {
        "background-image": "url('assets/background-image.jpg')",
      },
    },
  },
  plugins: [],
};
