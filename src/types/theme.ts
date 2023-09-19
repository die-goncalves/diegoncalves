enum Themes {
  'light',
  'dark'
}
export type Theme = keyof typeof Themes
export type ThemeCookie = Theme | undefined
