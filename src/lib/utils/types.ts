export type ProductCard = {
	productId: number;
	productName: string;
	price: number;
	discountPrice: number | null;
	discountExpiresAt: Date | null;
	categoryId: number;
	categoryName: string;
	parentCategoryId: number | null;
	parentCategoryName: string | null;
};
