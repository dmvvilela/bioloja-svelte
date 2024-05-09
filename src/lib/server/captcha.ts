import { TURNSTILE_KEY } from '$env/static/private';

export const verifyTurnstile = async (request: any) => {
	const body = await request.formData();

	// Turnstile injects a token in "cf-turnstile-response".
	const token = body.get('cf-turnstile-response');
	const ip = request.headers.get('CF-Connecting-IP');

	// Validate the token by calling the "/siteverify" API endpoint.
	const formData = new FormData();
	formData.append('secret', TURNSTILE_KEY);
	formData.append('response', token);
	formData.append('remoteip', ip);

	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: formData,
		method: 'POST'
	});

	const outcome = await result.json();
	if (outcome.success) {
		return true;
	}

	console.error(outcome);
	return false;
};
