import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-erode)', ...defaultTheme.fontFamily.serif],
        sans: ['var(--font-tasa-explorer)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-iosevka)', ...defaultTheme.fontFamily.mono]
      },
      colors: {
        transparent: '#00000000',
        brand: '#5BC5AC',
        selection: '#78a3ffdd',
        mark: '#99ffe7',
        white: '#FFFFFF',
        'white/8': '#FFFFFF14',
        'white/16': '#FFFFFF29',
        'white/92': '#FFFFFFEB',
        black: '#000000',
        'black/8': '#00000014',
        'black/16': '#00000029',
        'black/92': '#000000EB',
        light: '#F7F7F7',
        'light/link-primary': '#1E40AF',
        'light/link-secondary': '#172554',
        dark: '#282729',
        'dark/link-primary': '#93C5FD',
        'dark/link-secondary': '#A5B5C6'
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' }
        },
        'backdrop-in': {
          from: { opacity: '0', 'backdrop-filter': 'blur(0px)' },
          to: { opacity: '1', 'backdrop-filter': 'blur(4px)' }
        },
        'backdrop-out': {
          from: { opacity: '1', 'backdrop-filter': 'blur(4px)' },
          to: { opacity: '0', 'backdrop-filter': 'blur(0px)' }
        },
        'slide-in': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0%)' }
        },
        'slide-out': {
          from: { transform: 'translateX(0%)' },
          to: { transform: 'translateX(-100%)' }
        }
      }
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px'
    },
    fontSize: {
      xs: ['0.875rem' /* 12px */, '125%' /* 15px */],
      sm: ['1rem' /* 16px */, '150%' /* 24px */],
      base: ['1.25rem' /* 20px */, '175%' /* 35px */],
      xl: ['2rem' /* 32px */, '125%' /* 40px */],
      '2xl': ['3rem' /* 48px */, '125%' /* 60px */],
      '3xl': ['6rem' /* 96px */, '100%' /* 96px */]
    }
  },
  plugins: [require('tailwindcss-easing')]
}
export default config
