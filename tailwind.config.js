/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js,css}"],
  theme: {
    extend: {
      backgroundImage: {
        "layered-waves-haikei": "url('assets/layered-waves-haikei.svg')",
      },
    },
  },
  plugins: [],
};
