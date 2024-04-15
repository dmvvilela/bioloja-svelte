import { invalidate } from '$app/navigation';
import { PUBLIC_IMAGES_BUCKET_URL } from '$env/static/public';
import { cartItemsCount, guestCart } from '$lib/stores/cart';

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
	// If the user is not logged in we use the guest cart on client only
	if (!userId) {
		const response = await fetch(`/api/product/${productId}`);

		const json = await response.json();
		if (!response.ok) throw new Error(json.message);

		guestCart.add(json);
		cartItemsCount.update((count) => count + 1);
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
	if (!response.ok) throw new Error(json.message);

	cartItemsCount.update((count) => count + 1);
};

export const removeFromCart = async (userId: string | undefined, productId: number) => {
	// If the user is not logged in we use the guest cart on client only
	if (!userId) {
		guestCart.remove(productId);
		cartItemsCount.update((count) => (count ? count - 1 : 0));
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
	if (!response.ok) console.error(json.message);

	// Refetch cart data
	invalidate('app:checkout');
	cartItemsCount.update((count) => (count ? count - 1 : 0));
};
