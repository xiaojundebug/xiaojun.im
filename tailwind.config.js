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
        night: '#22232a',
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
    container: {
      padding: '1.5rem',
      center: true,
      // 两侧留白，最大宽度设为 768px
      screens: {
        sm: '640px',
        md: '768px',
        lg: '768px',
        xl: '768px',
        '2xl': '768px',
      },
    },
  },
  plugins: [],
}
