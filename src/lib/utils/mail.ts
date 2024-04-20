import mjml2html from 'mjml';
import type { SvelteComponent } from 'svelte';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { create_ssr_component } from 'svelte/internal';

/**
 * Removes classes added to elements by the Svelte compiler because MJML does
 * not support them.
 */
const stripSvelteClasses = (html: string) => html.replaceAll(/class="s-[\w-]+"/g, '');

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
