export type ProductType = {
	productId: number;
	productName: string;
	productSlug: string;
	imageUrls: string;
	price: number;
	discountPrice: number | null;
	discountExpiresAt: Date | null;
	categoryId: number;
	categoryName: string;
	parentCategoryId: number | null;
	parentCategoryName: string | null;
};
