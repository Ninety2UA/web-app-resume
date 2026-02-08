import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#FDFCFA',
          100: '#F5F0EB',
          200: '#EDE6DE',
          300: '#D5D0CB',
          400: '#B5B0AB',
          500: '#8A8580',
          600: '#6B6560',
          700: '#4A4640',
          800: '#2D2B27',
          900: '#1A1814',
        },
        coral: {
          DEFAULT: '#E07A5F',
          light: '#F4A592',
          dark: '#C96347',
          50: '#FEF2EE',
        },
        teal: {
          DEFAULT: '#4A9B8E',
          light: '#7EC8BD',
          dark: '#3B7D72',
          50: '#EFF8F6',
        },
        amber: {
          DEFAULT: '#E6B35A',
          light: '#F5D185',
          dark: '#D49A3A',
          50: '#FDF6E8',
        },
        lavender: {
          DEFAULT: '#7C6FB0',
          light: '#A193CC',
          dark: '#635897',
          50: '#F2F0F8',
        },
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(26,24,20,0.06)',
        'card-hover': '0 8px 25px rgba(26,24,20,0.1)',
        'nav': '0 4px 20px rgba(26,24,20,0.08)',
        'glow-coral': '0 0 20px rgba(224,122,95,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'draw-path': 'drawPath 1.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drawPath: {
          '0%': { strokeDashoffset: '1' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
