/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			{
				// Check: https://daisyui.com/docs/colors/ for all color names
				cupcake: {
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					...require('daisyui/src/theming/themes')['[data-theme=cupcake]'],
					primary: '#7C9AA6'
				}
			}
		]
	}
};

// Canva
// Tiber #092A39
// Gumbo #7B94A3
// Pearl Bush #E8E2D4
// Slate Gray #778C9C

// Canva 2
// Sisal #D2CDBE

// Adobe 1
// #012E40
// #7C9AA6
// #2F5559
// #F2BC79
// #F2F2F2

// Adobe 2
// #025949

// Medidor Digital
// #00594E
