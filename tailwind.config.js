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
          green: '#c7e7c9',
          blue: '#cbeaf6',
          pink: '#f7d2e0',
          floral: '#effaf1',
        },
        accent: '#8dc8c8',
        text: '#2d4736',
        muted: '#6a7c6d',
      },
      fontFamily: {
        'great-vibes': ['Great Vibes', 'cursive'],
        'pacifico': ['Pacifico', 'cursive'],
        'comic': ['Comic Sans MS', 'cursive'],
      },
    },
  },
  plugins: [],
}