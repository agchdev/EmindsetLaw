/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D3748',
          dark: '#1A202C',
          light: '#4A5568',
        },
        secondary: {
          DEFAULT: '#4299E1',
          dark: '#2B6CB0',
        },
        dark: '#1A202C',
        light: '#F7FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
