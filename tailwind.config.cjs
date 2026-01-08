/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx"
  ],
  theme: {
    extend: {
      colors: {
        'floral-pastel': '#fdf6f0',
        'rose-primary': '#be185d',
        'rose-accent': '#ec4899',
        'electric': '#0ff6fc',
        'neon-purple': '#a259ff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(190,24,93,0.1)',
        'glass-lg': '0 20px 60px 0 rgba(190,24,93,0.15)',
        'neon': '0 0 20px rgba(236,72,153,0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'bounce-soft': 'bounceSoft 1.5s ease-in-out infinite',
        'glow': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        glowPulse: {
          '0%, 100%': { 'box-shadow': '0 0 20px rgba(236, 72, 153, 0.5)' },
          '50%': { 'box-shadow': '0 0 40px rgba(236, 72, 153, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}