/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/.{vue,js,ts}"
	],
	theme: {
		extend: {
			boxShadow: {
				neobrut: "6px 6px #35495e"
			},
			colors: {
				"calculator-candy": "#f096e3",
				"calculator-mint": "#41B883",
				"calculator-mustard": "#ffdb58",
				"calculator-police-blue": "#35495e"
			}
		}
	},
	plugins: [],
}
