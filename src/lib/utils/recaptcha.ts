import { PUBLIC_RECAPTCHA_KEY } from '$env/static/public';

/* eslint-disable @typescript-eslint/ban-ts-comment */
export const getRecaptchaToken = (): Promise<string> => {
	return new Promise((resolve, reject) => {
		// @ts-ignore
		grecaptcha.ready(() => {
			// @ts-ignore
			grecaptcha
				.execute(PUBLIC_RECAPTCHA_KEY, { action: 'submit' })
				.then((token: string) => {
					resolve(token);
				})
				.catch((err: any) => {
					console.error(err);
					reject(null);
				});
		});
	});
};
