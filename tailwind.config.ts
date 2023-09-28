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
        'white/80': '#FFFFFFCC',
        'white/92': '#FFFFFFEB',
        black: '#000000',
        'black/8': '#00000014',
        'black/16': '#00000029',
        'black/80': '#000000CC',
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
      xl: ['1.5rem' /* 24px */, '125%' /* 30px */],
      '2xl': ['2rem' /* 32px */, '125%' /* 40px */],
      '3xl': ['3rem' /* 48px */, '125%' /* 60px */],
      '4xl': ['6rem' /* 96px */, '100%' /* 96px */]
    },
    boxShadow: {
      'sm-wh':
        '0 1px 2px 0 rgba(0, 0, 0, .14), 0 0.5px 1px 0 rgba(0, 0, 0, .12)',
      'base-wh':
        '0 2px 4px 0 rgba(0, 0, 0, .14), 0 1px 2px 0 rgba(0, 0, 0, .12)',
      'md-wh': '0 4px 8px 0 rgba(0, 0, 0, .14), 0 2px 4px 0 rgba(0, 0, 0, .12)',
      'lg-wh':
        '0 8px 16px 0 rgba(0, 0, 0, .14), 0 4px 8px 0 rgba(0, 0, 0, .12)',
      'xl-wh':
        '0 12px 24px 0 rgba(0, 0, 0, .24), 0 6px 12px 0 rgba(0, 0, 0, .20)',
      '2xl-wh':
        '0 16px 32px 0 rgba(0, 0, 0, .24), 0 8px 16px 0 rgba(0, 0, 0, .20)',
      'sm-bk':
        '0 1px 2px 0 rgba(0, 0, 0, .28), 0 0.5px 1px 0 rgba(0, 0, 0, .24)',
      'base-bk':
        '0 2px 4px 0 rgba(0, 0, 0, .28), 0 1px 2px 0 rgba(0, 0, 0, .24)',
      'md-bk': '0 4px 8px 0 rgba(0, 0, 0, .28), 0 2px 4px 0 rgba(0, 0, 0, .24)',
      'lg-bk':
        '0 8px 16px 0 rgba(0, 0, 0, .28), 0 4px 8px 0 rgba(0, 0, 0, .24)',
      'xl-bk':
        '0 12px 24px 0 rgba(0, 0, 0, .36), 0 6px 12px 0 rgba(0, 0, 0, .32)',
      '2xl-bk':
        '0 16px 32px 0 rgba(0, 0, 0, .36), 0 8px 16px 0 rgba(0, 0, 0, .32)',
      none: defaultTheme.boxShadow.none
    }
  },
  plugins: [require('tailwindcss-easing')]
}
export default config
