import type { ProductCard } from './types';
import { PUBLIC_SLIDES_BUCKET_URL } from '$env/static/public';

export const getSlideImageUrl = (product: ProductCard, slideNumber = 1): string => {
	const category = product.categoryNames.find((c) => c !== 'Seres Vivos')!;
	let path = `/${category}/${product.productName}/`;
	// if (product.parentCategoryName && product.parentCategoryName !== 'Seres Vivos') {
	// 	path = `/${product.parentCategoryName}/` + path;
	// }
	path = PUBLIC_SLIDES_BUCKET_URL + path + `slides/slide${slideNumber}.jpg`;
	return path;
};

export const getLocalePrice = (price: number) => (price / 100).toFixed(2).replace('.', ',');
