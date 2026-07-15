// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#8B2C1D',
        accent: '#D4A24C',
        background: '#F7F1E8',
        text: '#2B2118',
        forest: '#3A5A40',
        cream: '#FDF8F2',
        'warm-beige': '#E8DCC8',
        'light-gold': '#E8D5A3',
      },
      fontFamily: {
        heading: ['DM Serif Display', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        card: '28px',
        button: '9999px',
        input: '20px',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(43,33,24,0.06)',
        medium: '0 8px 40px rgba(43,33,24,0.08)',
        hover: '0 12px 56px rgba(43,33,24,0.12)',
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
        '80': '80px',
        '120': '120px',
      },
    },
  },
  plugins: [],
};

export default config;