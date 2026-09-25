/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#fffbebee',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          900: '#78350f',
        },
        saffron: {
          DEFAULT: '#FF9933',
          dark: '#E67E00',
          light: '#FFB366',
        },
        peacock: {
          DEFAULT: '#005F73',
          dark: '#0A9396',
          light: '#94D2BD',
        },
        terracotta: {
          DEFAULT: '#CA6702',
          dark: '#BB3E03',
        },
        parchment: {
          DEFAULT: '#FAF5E8',
          card: '#F4ECD8',
          dark: '#1E1B18',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cinzel', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
