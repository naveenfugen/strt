/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepNavy: '#0a0a1a',
        gold: {
          DEFAULT: '#FFD700',
          light: '#FFF099',
          dark: '#B8860B',
        },
        roseGold: {
          DEFAULT: '#E8A0BF',
          light: '#F5D3E3',
          dark: '#C87E9E',
        },
        glassWhite: 'rgba(255, 255, 255, 0.1)',
      },
      animation: {
        shimmer: 'shimmer 2.5s linear infinite',
        float: 'float 6s ease-in-out infinite',
        flicker: 'flicker 0.15s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'balloon-sway': 'balloon-sway 4s ease-in-out infinite',
        'heart-float': 'heart-float 5s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        flicker: {
          '0%, 100%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.9' },
          '50%': { transform: 'scale(1.05) rotate(1deg)', opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))' },
        },
        'balloon-sway': {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '50%': { transform: 'translateX(15px) rotate(5deg)' },
        },
        'heart-float': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-100px) scale(0.8)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
