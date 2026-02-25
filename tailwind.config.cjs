/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dsua: {
          50: '#eef6ff',
          100: '#dcecff',
          200: '#c0ddff',
          300: '#8dc2ff',
          400: '#56a2ff',
          500: '#2f83f2',
          600: '#1e65d2',
          700: '#184fa9',
          800: '#194489',
          900: '#0f2f61'
        },
        accent: {
          500: '#00b5e2',
          600: '#0098c0'
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Manrope', 'sans-serif']
      },
      boxShadow: {
        card: '0 18px 40px -24px rgba(16, 42, 97, 0.42)'
      },
      animation: {
        'fade-up': 'fadeUp 500ms ease-out both'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
};
