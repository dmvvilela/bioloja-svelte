import { z } from 'zod';

const emailRegex =
	/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const isEmail = (email: string) => typeof email === 'string' && emailRegex.test(email);

export const isPassword = (password: string) =>
	typeof password === 'string' && password.length > 6 && password.length < 25;

export const SignUpSchema = z
	.object({
		username: z.string().min(2).max(50),
		password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
		confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' })
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	});

export const SignInSchema = z.object({
	username: z.string().min(2).max(50),
	password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
});
