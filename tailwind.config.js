/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design system custom tokens
        light: {
          bg: '#FAF9FC',
          surface: '#FFFFFF',
          secondary: '#F3EFF8',
          border: '#E7DFEF',
          text: '#0F172A',
          muted: '#64748B',
          accent: '#6D28D9',
          accentHover: '#5B21B6',
          accentLight: '#EDE9FE',
        },
        dark: {
          bg: '#09090D',
          surface: '#12121A',
          secondary: '#1A1A26',
          border: '#262638',
          text: '#F8FAFC',
          muted: '#94A3B8',
          accent: '#A78BFA',
          accentHover: '#C4B5FD',
          accentLight: '#231B38',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
