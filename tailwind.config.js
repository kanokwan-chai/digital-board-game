/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          blue: {
            light: '#f0f9ff',
            DEFAULT: '#e0f2fe',
            medium: '#7dd3fc',
            dark: '#0284c7',
          },
          purple: {
            light: '#faf5ff',
            DEFAULT: '#f3e8ff',
            medium: '#d8b4fe',
            dark: '#7e22ce',
          },
          pink: {
            light: '#fdf2f8',
            DEFAULT: '#fce7f3',
            medium: '#fbcfe8',
            dark: '#be185d',
          },
          teal: {
            light: '#f0fdf4',
            DEFAULT: '#dcfce7',
            medium: '#86efac',
            dark: '#15803d',
          },
          gray: {
            light: '#f8fafc',
            DEFAULT: '#f1f5f9',
            dark: '#475569',
          }
        }
      },
      fontFamily: {
        sans: ['"Noto Sans Thai"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
