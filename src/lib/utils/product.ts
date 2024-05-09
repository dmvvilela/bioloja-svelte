import { invalidate } from '$app/navigation';
import { PUBLIC_IMAGES_BUCKET_URL } from '$env/static/public';
import { showToast } from '$lib/utils/toast';
import { trackEvent } from './analytics';
import type { AlgoliaProductType, ProductType } from '$lib/types/product';
import type { CartItem } from '$lib/types/checkout';

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

export const algoliaToProductType = (data: AlgoliaProductType): ProductType => {
	return {
		productId: data.id,
		productName: data.name,
		productSlug: data.slug,
		imageUrls: data.imageUrls.join(','),
		price: data.price,
		discountPrice: data.discountPrice,
		discountExpiresAt: data.discountExpiresAt ? new Date(data.discountExpiresAt) : null,
		categoryId: data.categories[0].id,
		categoryName: data.categories[0].name,
		categorySlug: data.categories[0].slug,
		parentCategoryId: data.categories?.[1]?.id,
		parentCategoryName: data.categories?.[1]?.name
	};
};

export type AddToCartType = {
	id: number;
	name: string;
	slug: string;
	categories: string[];
	price: number;
};
export const addToCart = async (product: AddToCartType) => {
	showToast(
		new Promise((resolve, reject) => {
			(async () => {
				const response = await fetch('/api/cart', {
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify({ productId: product.id })
				});

				const json = await response.json();
				if (!response.ok) {
					console.error(json);
					reject(json);
					return;
				}

				// Refetch cart data (items count)
				invalidate('layout:load');

				const price = product.price / 100;
				trackEvent('event', 'add_to_cart', {
					currency: 'BRL',
					value: price,
					items: [
						{
							item_id: product.id.toString(),
							item_name: product.name,
							price: price.toFixed(2),
							quantity: 1,
							item_category: product.categories.join(','),
							item_variant: product.slug
						}
					]
				});

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

export const removeFromCart = async (product: CartItem) => {
	showToast(
		new Promise((resolve, reject) => {
			(async () => {
				const response = await fetch('/api/cart', {
					method: 'DELETE',
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify({ productId: product.id })
				});

				const json = await response.json();
				if (!response.ok) {
					console.error(json);
					reject(json);
					return;
				}

				// Refetch cart data - we can only remove on cart/checkout layout
				invalidate('app:checkout');

				const price = (product.discountPrice || product.price) / 100;
				trackEvent('event', 'remove_from_cart', {
					currency: 'BRL',
					value: price,
					items: [
						{
							item_id: product.id.toString(),
							item_name: product.name,
							price: price.toFixed(2),
							quantity: 1,
							item_category: product.categories.join(','),
							item_variant: product.slug,
							index: product.lineId
						}
					]
				});

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
