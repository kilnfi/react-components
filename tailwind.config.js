const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  prefix: 'rc-',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['DM Mono', 'monospace']
      },
      colors: {
        'black': '#202020',
        'primary': {
          DEFAULT: '#ff6521',
          'hover': '#ff7935',
          'pressed': '#f35915',
          'disabled': '#d7d2d0',
          'tint-300': '#ffd8c5',
          'tint-200': '#ffede4',
          'tint-100': '#fff6f1',
        },
        'status': {
          'green': '#EAF5E4',
          'orange': '#F9F0E2',
          'red': '#FCE6E6'
        },
        'gray': {
          '50': '#f9f9f9',
          '100': '#efefef',
          '200': '#e6e6e6',
          '300': '#dadada',
          '500': '#bebebe',
          '700': '#888888',
          '800': '#5c5c5c',
          '900': '#333333',
          'deep-dark': '#202020',
        },
        'success': {
          DEFAULT: '#6fbe6d',
          'light': '#f1f9f1',
        },
        'error': {
          DEFAULT: '#ee5b5b',
          'hover': '#fc6969',
          'pressed': '#e45151',
          'light': '#fef2f2',
        },
        'purple': {
          DEFAULT: '#dadeff',
          'dark': '#c6caeb',
          'darkest': '#4e5273',
        },
        'yellow': {
          DEFAULT: '#eff9b0',
          'dark': '#dbe59c',
          'darkest': '#6d772e',
        },
        'latte': {
          DEFAULT: '#f0eee9',
          'dark': '#d2d0cb',
          'darkest': '#787671',
        },
      },
      borderRadius: {
        DEFAULT: '10px',
      },
      spacing: {
        '4.5': '1.125rem',
        '7.5': '1.875rem',
      },
      boxShadow: {
        DEFAULT: '0 8px 16px #efefef',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
