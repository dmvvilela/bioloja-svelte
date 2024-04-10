import { PUBLIC_IMAGES_BUCKET_URL } from '$env/static/public';

export const getSlideImageUrl = (imageUrls: string, slide = 0) => {
	const path = imageUrls.split(',')[slide].trim();
	return PUBLIC_IMAGES_BUCKET_URL + path;
};

export const getLocalePrice = (price: number) => (price / 100).toFixed(2).replace('.', ',');
