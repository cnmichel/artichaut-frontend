/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,html}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    ],
  theme: {
    extend: {
      colors: {
        'tonic': '#00B561',
      },
    }
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("tw-elements/dist/plugin")
  ],
}
