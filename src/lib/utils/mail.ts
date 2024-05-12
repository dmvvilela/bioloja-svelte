/* eslint-disable @typescript-eslint/ban-ts-comment */
import mjml2html from 'mjml';
import type { SvelteComponent } from 'svelte';
// @ts-ignore
import type { create_ssr_component } from 'svelte/internal';

/**
 * Removes classes added to elements by the Svelte compiler because MJML does
 * not support them.
 *
 * Also removes data-svelte-* attributes from the HTML string
 */
const stripSvelteClasses = (html: string) =>
	html.replaceAll(/class="s-[\w-]+"/g, '').replace(/ data-svelte-[^=]*="[^"]*"/g, '');

/** Renders a Svelte component as email-ready HTML. */
export const render = <Props extends Record<string, any>>(
	component: new (...args: any[]) => SvelteComponent<Props>,
	subject: string,
	props: Props
) => {
	const ssrComponent = component as unknown as ReturnType<typeof create_ssr_component>;

	// Render the component to MJML
	const { html: body, css, head } = ssrComponent.render(props);

	const mjml = `<mjml>
        <mj-head>
					<mj-title>${subject}</mj-title>
					<mj-font name="Poppins" href="https://fonts.googleapis.com/css?family=Poppins" />
          ${stripSvelteClasses(head)}
					<mj-attributes>
						<mj-all font-family="Poppins, Roboto, Helvetica, sans-serif" />
						<mj-text font-weight="300" font-size="16px" color="#616161" line-height="24px" />
						<mj-section padding="0px" />
					</mj-attributes>
          <mj-style>${css.code}</mj-style>
        </mj-head>
        <mj-body background-color="#FFFFFF">${stripSvelteClasses(body)}</mj-body>
      </mjml>`;

	// Render MJML to HTML
	const { html, errors } = mjml2html(mjml);
	if (errors.length > 0) console.warn(errors);

	return html;
};

export const mockData = {
	name: 'Daniel Vilela',
	email: 'danielbsb2@gmail.com',
	message: 'Test message',
	orderNumber: '12345',
	orderDate: new Date(),
	paymentMethodTitle: 'Boleto Bancário',
	couponCode: 'NOVABIOLOJA',
	discount: 1500,
	subtotal: 10000,
	total: 8500,
	verificationLink: 'https://bioloja.bio.br/super_link',
	mainProduct: {
		title: 'Fisiologia vegetal II – Crescimento e desenvolvimento parte II: Fitormônios',
		description:
			'Material voltado principalmente para o ensino superior. Aborda, de forma geral, os hormônios vegetais (fitormônios) e seus efeitos nos processos fisiológicos, de crescimento e desenvolvimento, bem como os movimentos em planta. Conteúdo específico: 1- Introdução: Polaridade nas plantas; 2- Hormônios vegetais (Fitormônios): auxinas, giberelinas, citocininas, etileno, ácido abscísico, brassinosteroides e estrigolactonas (inclui também histórico das auxinas e giberelinas); sinalização hormonal (introdução); 3- Movimentos em plantas: tropismos, tactismos e nastismos. Material ilustrado e com animações (nastismos); contém gráficos e anotações do apresentador para ajudar na abordagem e compreensão do tema.',
		price: '15,99',
		discount_price: '10,99',
		image: 'https://bioimages.d2vsolutions.com/uploads/2019/09/Slide1-2.jpg',
		link: 'http://localhost:5173/loja/produto/fisiologia-vegetal-ii-crescimento-e-desenvolvimento-parte-ii-fitormonios'
	},
	products: [
		{
			title: 'Fisiologia vegetal II – Crescimento e desenvolvimento parte II: Fitormônios',
			description:
				'Material voltado principalmente para o ensino superior. Aborda, de forma geral, os hormônios vegetais (fitormônios) e seus efeitos nos processos fisiológicos, de crescimento e desenvolvimento, bem como os movimentos em planta. Conteúdo específico: 1- Introdução: Polaridade nas plantas; 2- Hormônios vegetais (Fitormônios): auxinas, giberelinas, citocininas, etileno, ácido abscísico, brassinosteroides e estrigolactonas (inclui também histórico das auxinas e giberelinas); sinalização hormonal (introdução); 3- Movimentos em plantas: tropismos, tactismos e nastismos. Material ilustrado e com animações (nastismos); contém gráficos e anotações do apresentador para ajudar na abordagem e compreensão do tema.',
			price: '15,99',
			discount_price: '10,99',
			image: 'https://bioimages.d2vsolutions.com/uploads/2019/09/Slide1-2.jpg',
			link: 'http://localhost:5173/loja/produto/fisiologia-vegetal-ii-crescimento-e-desenvolvimento-parte-ii-fitormonios'
		},
		{
			title: 'Fisiologia vegetal II – Crescimento e desenvolvimento parte II: Fitormônios',
			description:
				'Material voltado principalmente para o ensino superior. Aborda, de forma geral, os hormônios vegetais (fitormônios) e seus efeitos nos processos fisiológicos, de crescimento e desenvolvimento, bem como os movimentos em planta. Conteúdo específico: 1- Introdução: Polaridade nas plantas; 2- Hormônios vegetais (Fitormônios): auxinas, giberelinas, citocininas, etileno, ácido abscísico, brassinosteroides e estrigolactonas (inclui também histórico das auxinas e giberelinas); sinalização hormonal (introdução); 3- Movimentos em plantas: tropismos, tactismos e nastismos. Material ilustrado e com animações (nastismos); contém gráficos e anotações do apresentador para ajudar na abordagem e compreensão do tema.',
			price: '15,99',
			discount_price: '10,99',
			image: 'https://bioimages.d2vsolutions.com/uploads/2019/09/Slide1-2.jpg',
			link: 'http://localhost:5173/loja/produto/fisiologia-vegetal-ii-crescimento-e-desenvolvimento-parte-ii-fitormonios'
		},
		{
			title: 'Fisiologia vegetal II – Crescimento e desenvolvimento parte II: Fitormônios',
			description:
				'Material voltado principalmente para o ensino superior. Aborda, de forma geral, os hormônios vegetais (fitormônios) e seus efeitos nos processos fisiológicos, de crescimento e desenvolvimento, bem como os movimentos em planta. Conteúdo específico: 1- Introdução: Polaridade nas plantas; 2- Hormônios vegetais (Fitormônios): auxinas, giberelinas, citocininas, etileno, ácido abscísico, brassinosteroides e estrigolactonas (inclui também histórico das auxinas e giberelinas); sinalização hormonal (introdução); 3- Movimentos em plantas: tropismos, tactismos e nastismos. Material ilustrado e com animações (nastismos); contém gráficos e anotações do apresentador para ajudar na abordagem e compreensão do tema.',
			price: '15,99',
			discount_price: '10,99',
			image: 'https://bioimages.d2vsolutions.com/uploads/2019/09/Slide1-2.jpg',
			link: 'http://localhost:5173/loja/produto/fisiologia-vegetal-ii-crescimento-e-desenvolvimento-parte-ii-fitormonios'
		}
	]
};
