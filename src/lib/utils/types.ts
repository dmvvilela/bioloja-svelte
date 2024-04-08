export type ProductType = {
	productId: number;
	productName: string;
	imageUrls: string;
	price: number;
	discountPrice: number | null;
	discountExpiresAt: Date | null;
	categoryId: number;
	categoryName: string;
	parentCategoryId: number | null;
	parentCategoryName: string | null;
};
