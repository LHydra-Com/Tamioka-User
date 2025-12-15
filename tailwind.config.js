/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ef4444', // Tailwind red-500
        },
        secondary: {
          DEFAULT: '#3b82f6', // Tailwind blue-500
        },
        tertiary: {
          DEFAULT: '#ffffff', // white
        },
      },
    },
  },
  plugins: [],
};
