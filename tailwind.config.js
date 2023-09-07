const { blackA, violet, mauve } = require('@radix-ui/colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...violet,
        ...mauve,
        'primary': '#29235c',
        'secondary': '#e73178',
        'tertiary': '#044E77',
        'silver': '#F2F2F2',
      },
    },
  },
  plugins: [],
}
