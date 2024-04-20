import { invalidate } from '$app/navigation';
import { PUBLIC_IMAGES_BUCKET_URL } from '$env/static/public';
import { cartItemsCount } from '$lib/stores/cart';
import { showToast } from '$lib/utils/toast';

export const getImageUrl = (path: string) => PUBLIC_IMAGES_BUCKET_URL + path;

export const getSlideImageUrl = (imageUrls: string, slide = 0) => {
	const path = imageUrls.split(',')[slide].trim();
	return PUBLIC_IMAGES_BUCKET_URL + path;
};

export const getAllSlideImageUrls = (imageUrls: string) => {
	return imageUrls
		.split(',')
		.map((url) => PUBLIC_IMAGES_BUCKET_URL + url.trim())
		.slice(0, 9);
};

export const getLocalePrice = (price: number) => (price / 100).toFixed(2).replace('.', ',');

export const addToCart = async (productId: number) => {
	showToast(
		new Promise((resolve, reject) => {
			(async () => {
				const response = await fetch('/api/cart', {
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify({ productId })
				});

				const json = await response.json();
				if (!response.ok) {
					console.error(json);
					reject(json);
					return;
				}

				if (!json.exists) {
					cartItemsCount.update((count) => count + 1);
				}
				resolve(json);
			})();
		}),
		{
			loading: 'Adicionando...',
			success: (success: any) => success.message,
			error: 'Ocorreu um problema.'
		}
	);
};

export const removeFromCart = async (productId: number) => {
	showToast(
		new Promise((resolve, reject) => {
			(async () => {
				const response = await fetch('/api/cart', {
					method: 'DELETE',
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify({ productId })
				});

				const json = await response.json();
				if (!response.ok) {
					console.error(json);
					reject(json);
					return;
				}

				// Refetch cart data
				invalidate('app:checkout');
				cartItemsCount.update((count) => (count ? count - 1 : 0));
				resolve(json);
			})();
		}),
		{
			loading: 'Removendo...',
			success: 'Produto removido!',
			error: 'Ocorreu um problema.'
		}
	);
};
