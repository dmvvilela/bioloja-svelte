export type CartItem = {
	productId: number;
	productName: string;
	productSlug: string;
	lineId: number;
	itemPrice: number;
	itemDiscountPrice: number | null;
};

export type Cart = {
	cartId: string;
	userId: string | null;
	orderNumber: string | null;
	discount: number;
	couponCode: string | null;
	subtotal: number;
	total: number;
	createdAt: Date;
	updatedAt: Date;
	itemProducts: CartItem[];
};
