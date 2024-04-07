export type ProductType = {
	productId: number;
	productName: string;
	imageUrls: string;
	price: number;
	discountPrice?: number;
	discountExpiresAt?: Date;
	categoryId: number;
	categoryName: string;
	parentCategoryId?: number;
	parentCategoryName?: string;
};
