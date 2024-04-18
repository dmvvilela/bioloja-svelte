import { invalidate } from '$app/navigation';
import { PUBLIC_IMAGES_BUCKET_URL } from '$env/static/public';
import { cartItemsCount, guestCart } from '$lib/stores/cart';
import toast from 'svelte-french-toast';

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

export const addToCart = async (userId: string | undefined, productId: number) => {
	toast.promise(
		new Promise((resolve, reject) => {
			(async () => {
				// If the user is not logged in we use the guest cart on client only
				if (!userId) {
					const response = await fetch(`/api/product/${productId}`);

					const json = await response.json();
					if (!response.ok) {
						console.error(json);
						reject(json);
						return;
					}

					// TODO: Check if exists before fetching.. and how to exit here?
					guestCart.add(json);
					cartItemsCount.update((count) => count + 1);

					resolve(json);
					return;
				}

				// If we have the user, we use the database's cart
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
			// success: 'Produto adicionado!',
			success: (success: any) => success.message, // Use the message from resolve
			// error: (error) => `Ocorreu um problema: ${error.message}`
			error: 'Ocorreu um problema.'
		},
		{
			position: 'bottom-center',
			style: 'border-radius: 200px; background: #333; color: #fff; padding: 12px;'
		}
	);
};

export const removeFromCart = async (userId: string | undefined, productId: number) => {
	toast.promise(
		new Promise((resolve, reject) => {
			(async () => {
				// If the user is not logged in we use the guest cart on client only
				if (!userId) {
					guestCart.remove(productId);
					cartItemsCount.update((count) => (count ? count - 1 : 0));
					resolve(true);
					return;
				}

				// If we have the user, we use the database's cart
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
		},
		{
			position: 'bottom-center',
			style: 'border-radius: 200px; background: #333; color: #fff; padding: 12px;'
		}
	);
};
