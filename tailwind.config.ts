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
      }
    }
  },
  plugins: [require('tailwindcss-easing')]
}
export default config
