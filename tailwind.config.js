/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			fredericka: 'Fredericka, serif',
			poppins: 'Poppins, sans-serif',
			lora: 'Lora, serif',
			inter: 'Inter, sans-serif'
		},
		extend: {
			colors: {
				bioloja: {
					50: '#ebf6ff',
					100: '#ddeaf0',
					200: '#c1d2d9',
					300: '#a1b7c1',
					400: '#87a1ad',
					500: '#7693a1',
					600: '#6b8c9c',
					700: '#597989',
					800: '#4b6c7c',
					900: '#385e6f'
				}
			}
		}
	},
	plugins: [
		require('daisyui'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio')
	],
	daisyui: {
		themes: [
			{
				// Check: https://daisyui.com/docs/colors/ for all color names
				cupcake: {
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					...require('daisyui/src/theming/themes')['[data-theme=cupcake]'],
					primary: '#7895A3',
					secondary: '#002336',
					accent: '#00594F',
					'background-color': '#FFFFFF'
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

// Mantine
// #7895A3
// https://mantine.dev/colors-generator/?color=7895A3
