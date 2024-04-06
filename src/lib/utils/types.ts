export type ProductCard = {
	productId: number;
	productName: string;
	price: number;
	discountPrice?: number;
	discountExpiresAt: Date | null;
	// categoryId: number;
	categoryNames: string[];
	// categoryName: string;
	// parentCategoryId: number | null;
	// parentCategoryName: string | null;
};
