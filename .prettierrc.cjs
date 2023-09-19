module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts',
	tailwindFunctions: ['clsx'],
  semi: false,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'none',
  arrowParens: 'avoid',
  endOfLine: 'auto'
}