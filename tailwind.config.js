/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      'noto-sans-sc': ['"Noto Sans SC"', 'monospace', 'sans-serif'],
      system: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        '"Fira Sans"',
        '"Droid Sans"',
        '"Helvetica Neue"',
        'sans-serif',
      ],
    },
    letterSpacing: { wider: '.1em', widest: '.25em' },
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
