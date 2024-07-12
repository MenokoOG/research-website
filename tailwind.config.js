module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // Enable dark mode support
  theme: {
    extend: {
      backgroundImage: {
        'light-gradient': 'linear-gradient(to right, #ffffff, #f3f4f6)',
        'dark-gradient': 'linear-gradient(to right, #1a202c, #2d3748)',
      },
      colors: {
        lightCard: '#ffffff',
        darkCard: '#2d3748',
        primary: '#4FD1C5',
        secondary: '#63B3ED',
        accent: '#D53F8C',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
