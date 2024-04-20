import { invalidate } from '$app/navigation';
import { PUBLIC_IMAGES_BUCKET_URL } from '$env/static/public';
import { showToast } from '$lib/utils/toast';
import type { AlgoliaProductType, ProductType } from '$lib/types/product';

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

// TODO: Accept more categories.. and fix issues
export const algoliaToProductType = (data: AlgoliaProductType): ProductType => {
	return {
		productId: data.id,
		productName: data.name,
		productSlug: data.slug,
		imageUrls: data.imageUrls.join(','), // Convert array of URLs to comma-separated string
		price: data.price,
		discountPrice: data.discountPrice,
		discountExpiresAt: data.discountExpiresAt ? new Date(data.discountExpiresAt) : null,
		categoryId: 1, // You'll need to determine how to map categories from Algolia to your categoryId
		categoryName: data.categories[0], // Assuming the first category is the main one
		categorySlug: data.categories[0].toLowerCase().replace(/ /g, '-') // Convert category name to slug
		// parentCategoryId and parentCategoryName are not available in the Algolia data
	};
};

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

				// Refetch cart data (items count)
				invalidate('layout:load');
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

				// Refetch cart data - we can only remove on cart/checkout layout
				invalidate('app:checkout');
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
