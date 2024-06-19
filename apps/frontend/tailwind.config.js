/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-main': '#3f51b5',
        'primary-dark': '#303f9f', 
      },
    },
  },
  plugins: [],
}
