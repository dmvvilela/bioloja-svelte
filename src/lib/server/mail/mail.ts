/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as html2text from 'html-to-text';
import { render as renderMjmlEmail } from '$lib/utils/mail';
import { render as renderSvelteEmail } from 'svelte-email';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SES_REGION } from '$env/static/private';
import AWS from 'aws-sdk';
const convert = html2text.convert;

new AWS.Config({
	credentials: {
		accessKeyId: AWS_ACCESS_KEY_ID,
		secretAccessKey: AWS_SECRET_ACCESS_KEY
	}
});
AWS.config.update({ region: AWS_SES_REGION });

export const templateNameToSubject = (template: string) => {
	switch (template) {
		case 'new_plus':
			return 'Agora você é um membro AFH+!';
		case 'cancel_plus':
			return 'Você cancelou seu plano AFH+';
		case 'sign_up':
			return 'Seja bem-vindo(a) ao AFH!';
		case 'welcome':
			return 'Bem-vindo(a) ao site de Anatomia e Fisiologia Humana!';
		case 'curiosity':
			return 'Explore o fascinante mundo da anatomia e fisiologia humana!';
		case 'plus_reminder':
			return 'Torne-se um membro AFH+';
		case 'plus_reminder_2':
			return 'Já conheceu nossos benefícios de ser um membro AFH+?';
		case 'contact':
		default:
			return '✔ Contato do AFH';
	}
};

// Define a mapping of templates to their import functions
const componentImports = {
	mjml: {
		helloWorld: () => import('$lib/emails/mjml/hello-world.svelte'),
		newPlus: () => import('$lib/emails/mjml/new_plus.svelte'),
		cancelPlus: () => import('$lib/emails/mjml/cancel_plus.svelte')
	},
	svelte: {
		welcome: () => import('$lib/emails/svelte/welcome.svelte'),
		siteContact: () => import('$lib/emails/svelte/site_contact.svelte'),
		signUp: () => import('$lib/emails/svelte/sign_up.svelte')
	}
};

// Dynamically select the import function based on the template and type
export const getTemplateComponent = async (template: string, type: 'mjml' | 'svelte') => {
	// @ts-ignore
	const importFunction = componentImports[type][template];
	if (importFunction) {
		const module = await importFunction();
		return module.default;
	}

	return (await import(`../../emails/${type}/${template}.svelte`)).default;
};

// export const getTemplateComponent = async (template: string, type: 'mjml' | 'svelte') => {
// 	return (await import(`$lib/emails/${type}/${template}.svelte`)).default;
// };

export const renderEmailBody = async (
	template: string,
	subject: string,
	type: 'mjml' | 'svelte',
	props?: Record<string, unknown>
) => {
	try {
		const templateComponent = await getTemplateComponent(template, type);

		if (type === 'mjml') {
			// Render the email template to html and text
			// TODO: Use compile convert for performance on batch
			const html = renderMjmlEmail(templateComponent, subject, props || {});
			const text = convert(html, { preserveNewLines: true });

			return { html, text };
		} else {
			// Render the email template to html and text
			const html = renderSvelteEmail({
				template: templateComponent,
				props
			});

			const text = renderSvelteEmail({
				template: templateComponent,
				props,
				options: {
					plainText: true
				}
			});

			return { html, text };
		}
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const sendMail = async (
	to: string | string[],
	subject: string,
	html: string,
	text?: string
) => {
	const options = {
		Source: 'Bioloja <contato@bioloja.bio.br>',
		Destination: Array.isArray(to) ? { BccAddresses: to } : { ToAddresses: [to] },
		Message: {
			Body: {
				Html: {
					Charset: 'UTF-8',
					Data: html
				},
				...(text
					? {
							Text: {
								Charset: 'UTF-8',
								Data: text
							}
					  }
					: {})
			},
			Subject: {
				Charset: 'UTF-8',
				Data: subject
			}
		}
	};

	return new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(options).promise();
};
