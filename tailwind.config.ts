import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
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
      }
    }
  },
  plugins: [require('tailwindcss-easing')]
}
export default config
