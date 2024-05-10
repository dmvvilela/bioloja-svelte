/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as html2text from 'html-to-text';
import { render as renderMjmlEmail } from '$lib/utils/mail';
import { render as renderSvelteEmail } from 'svelte-email';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SES_REGION } from '$env/static/private';
import AWS from 'aws-sdk';
import logger from './logger';

const modules = import.meta.glob('$lib/emails/*/*');
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
		case 'new_website':
			return '[DESCONTO] Conheça a NOVA BIOLOJA!';
		case 'sign_up':
			return 'Bem-vindo(a) a Bioloja!';
		case 'reset_password':
			return 'Redefina sua senha';
		case 'order_confirmed':
			return 'Seu pedido foi confirmado!';
		case 'payment_approved':
			return '[Bioloja] Pagamento aprovado';
		case 'order_canceled':
			return '[Bioloja] Pedido cancelado';
		case 'site_contact':
		default:
			return '✔ Contato da Bioloja';
	}
};

// Dynamically select the import function based on the template and type
export const getTemplateComponent = async (template: string, type: 'mjml' | 'svelte') => {
	const path = `/src/lib/emails/${type}/${template}.svelte`;
	return (await (modules as any)[path]()).default;
};

export const renderEmailBody = async (
	template: string,
	subject: string,
	type: 'mjml' | 'svelte',
	props?: Record<string, unknown>
) => {
	try {
		const templateComponent = await getTemplateComponent(template, type);
		let html, text;

		switch (type) {
			case 'mjml':
				// Render the email template to html and text
				// TODO: Use compile convert for performance on batch
				html = renderMjmlEmail(templateComponent, subject, props || {});
				text = convert(html, { preserveNewLines: true });
				break;
			case 'svelte':
				// Render the email template to html and text
				html = renderSvelteEmail({
					template: templateComponent,
					props
				});

				text = renderSvelteEmail({
					template: templateComponent,
					props,
					options: {
						plainText: true
					}
				});
				break;
			default:
				throw new Error('Invalid type');
		}

		return { html, text };
	} catch (err: any) {
		await logger.error(err.message);
		return null;
	}
};

export const sendTemplateEmail = async (
	to: string | string[],
	template: string,
	type: 'mjml' | 'svelte',
	props?: Record<string, unknown>
) => {
	const subject = templateNameToSubject(template);
	const body = await renderEmailBody(template, subject, type, props);
	if (!body) {
		throw new Error('Could not render email body.');
	}

	return sendMail(to, subject, body.html, body.text);
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
		},
		// ...(Array.isArray(to)
		// 	? {
		ConfigurationSetName: 'bulk_send'
		// 	  }
		// 	: {})
	};

	return new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(options).promise();
};
