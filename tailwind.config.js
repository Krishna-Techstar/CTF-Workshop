/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#FFF8E7',
        brutal: {
          yellow: '#FFD93D',
          pink: '#FF6B9D',
          blue: '#4D9DE0',
          green: '#6BCB77',
          orange: '#FF9F45',
          purple: '#A29BFE',
          dark: '#121214',
          cardDark: '#1E1E24',
          borderDark: '#FFFFFF',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        heading: ['"Archivo Black"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0 #000',
        'brutal': '4px 4px 0 #000',
        'brutal-lg': '6px 6px 0 #000',
        'brutal-xl': '8px 8px 0 #000',
        'brutal-dark-sm': '2px 2px 0 #FFF',
        'brutal-dark': '4px 4px 0 #FFF',
        'brutal-dark-lg': '6px 6px 0 #FFD93D',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}
