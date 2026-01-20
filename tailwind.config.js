/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#0A0A0A',
          'slate-gray': '#6E7E91',
          gold: '#D4AF37',
        },
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}