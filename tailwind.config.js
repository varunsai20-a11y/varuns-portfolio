/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gta: {
          black: '#0a0a0a',
          dark: '#1a1a1a',
          panel: '#111111',
          yellow: '#F5C518',
          gold: '#FFD700',
          orange: '#FF6600',
          red: '#FF0000',
          green: '#00FF00',
          cyan: '#00D4FF',
          purple: '#9B59B6',
          blue: '#0088FF',
          white: '#FFFFFF',
          gray: '#888888',
        },
      },
      fontFamily: {
        gta: ['Pricedown', 'Impact', 'sans-serif'],
        hud: ['Chakra Petch', 'monospace'],
        body: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
