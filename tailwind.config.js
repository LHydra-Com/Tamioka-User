/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './app/**/*.{js,ts,tsx}',
    './screens/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: colors.red[700],
        secondary: colors.blue[700],
        tertiary: colors.white,
      },
    },
  },
  plugins: [],
};
