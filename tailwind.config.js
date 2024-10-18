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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow:{
        'innersm': 'inset 0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'btn':'1px 1px 0 #000',
        'btng':'2px 2px 0 #aaa',
        'btnw':'2px 2px 0 #ddd',
        'border': '0 0 1px #555'
      }
    },
  },
  plugins: [],
};