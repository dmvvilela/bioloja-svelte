import { PUBLIC_ENV } from '$env/static/public';
import logger from './logger';

export const sendNotification = (content: string) => {
	if (PUBLIC_ENV === 'development') {
		console.log('Discord notificado: ', content);
		return Promise.resolve('Discord notificado com sucesso');
	}

	return fetch(
		'https://discord.com/api/webhooks/1229618278133923890/JwmR1_jDMt9NyFiR6lrcmJw37YNBaj_hLMikcuDkxepLNVKlwyYoYoCSabVFySIP8_Q3',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content,
				username: 'Bioloja',
				avatar_url: 'https://bioimages.d2vsolutions.com/logo%2Ficon.jpg'
			})
		}
	)
		.then(() => {
			return 'Discord notificado com sucesso';
		})
		.catch(async (err: any) => {
			await logger.error(err.message);
			return 'Ocorreu um erro. Tente novamente mais tarde.';
		});
};
