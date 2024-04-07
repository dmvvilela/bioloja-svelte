import type { ProductType } from './types';
import { PUBLIC_IMAGES_BUCKET_URL } from '$env/static/public';

export const getMainImageUrl = (product: ProductType) => {
	const path = product.imageUrls.split(',')[0];
	return PUBLIC_IMAGES_BUCKET_URL + path;
};

export const getLocalePrice = (price: number) => (price / 100).toFixed(2).replace('.', ',');
