import { PUBLIC_ENV } from '$env/static/public';

export const sendNotification = (content: string) => {
	// if (PUBLIC_ENV === 'development') {
	// 	console.log('Discord notificado: ', content);
	// 	return Promise.resolve('Discord notificado com sucesso');
	// }

	return fetch(
		'https://discord.com/api/webhooks/1229618278133923890/JwmR1_jDMt9NyFiR6lrcmJw37YNBaj_hLMikcuDkxepLNVKlwyYoYoCSabVFySIP8_Q3',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content,
				username: 'Bioloja'
				// avatar_url:
				//   'https://d2vsolutions.com/assets/img/logo/apple-icon-152x152.png'
			})
		}
	)
		.then(() => {
			return 'Discord notificado com sucesso';
		})
		.catch((e) => {
			console.error(e);
			return 'Ocorreu um erro. Tente novamente mais tarde.';
		});
};
