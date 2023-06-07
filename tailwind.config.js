/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cherry': ['Cherry Bomb One', 'cursive'],
        'roboto': ['Roboto', 'san-serif']
      },
    }
  },
  plugins: [],
}
