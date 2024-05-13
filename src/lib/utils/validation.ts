const emailRegex =
	/^([a-zA-Z0-9_\-.+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const isEmail = (email: string) => typeof email === 'string' && emailRegex.test(email);

export const isPassword = (password: string) =>
	typeof password === 'string' && password.length > 6 && password.length < 25;
