/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff0f3',
          100: '#ffccd5',
          200: '#ffb3c6',
          300: '#ff8fa3',
          400: '#ff758f',
          500: '#ff4d6d',
          600: '#c9184a',
          700: '#a4133c',
          800: '#800f2e',
          900: '#590d22',
          950: '#2b0712',
        },
        burgundy: {
          800: '#3d081b',
          900: '#240410',
          950: '#140108',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        handwriting: ['Caveat', 'Dancing Script', 'cursive'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.2s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.12)' },
          '70%': { transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 77, 109, 0.3), 0 0 30px rgba(255, 77, 109, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 77, 109, 0.6), 0 0 60px rgba(255, 77, 109, 0.4)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
