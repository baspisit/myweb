/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--color-canvas) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        brand: 'rgb(var(--color-brand) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
      },
      fontFamily: { sans: ['Inter', 'Noto Sans Thai', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      borderRadius: { card: '1rem', control: '0.625rem' },
      boxShadow: { card: 'var(--shadow-card)', raised: 'var(--shadow-raised)' },
    },
  },
  plugins: [],
};
