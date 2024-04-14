export type CartItem = {
	id: number;
	name: string;
	slug: string;
	lineId: number;
	price: number;
	discountPrice: number | null;
	imageUrls: string;
};

export type Cart = {
	cartId: string;
	userId: string | null;
	orderNumber: string | null;
	discount: number;
	couponCode: string | null;
	couponValue: number | null;
	couponUsed: boolean | null;
	couponExpired: boolean | null;
	subtotal: number;
	total: number;
	products: CartItem[];
	createdAt: Date;
	updatedAt: Date;
};
