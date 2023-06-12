/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {}
  },
  corePlugins: {
    preflight: false
  },
  plugins: [require('@tailwindcss/line-clamp')],
  important: true
};