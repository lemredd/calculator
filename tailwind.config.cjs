/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/.{vue,js,ts}"
	],
	theme: {
		extend: {
			boxShadow: {
				neobrut: "4px 4px black"
			},
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
