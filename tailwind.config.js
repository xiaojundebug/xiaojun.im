/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
      },
      transitionTimingFunction: {
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transformOrigin: {
        'center-bottom': '50% 100%',
      },
      keyframes: {
        floating: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(0, 10%)' },
        },
      },
      animation: {
        floating: 'floating 4s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
