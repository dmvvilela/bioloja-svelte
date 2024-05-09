import { RECAPTCHA_KEY } from '$env/static/private';

export const verifyRecaptcha = (token: string) => {
	const key = RECAPTCHA_KEY;

	return fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${key}&response=${token}`, {
		method: 'POST'
	})
		.then((res: Response) => res.json())
		.then((json) => {
			if (json.success) {
				return true;
			} else {
				return false;
			}
		})
		.catch((e) => {
			console.error(e);
			return false;
		});
};
