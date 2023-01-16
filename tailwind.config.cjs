/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/.{vue,js,ts}"
	],
	theme: {
		extend: {
			colors: {
				"calculator-candy": "#f096e3",
				"calculator-mint": "#4e9e94",
				"calculator-mustard": "#f7cb45",
				"calculator-ocean": "#2e66d2",
				"calculator-sky": "#8a94f8",
			}
		}
	},
	plugins: [],
}
