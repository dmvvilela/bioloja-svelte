export type CartItem = {
	id: number;
	name: string;
	slug: string;
	lineId: number;
	price: number;
	discountPrice: number | null;
	imageUrls: string;
};

export type Coupon = {
	code: string | null;
	value: number | null;
	type: string | null;
	minAmount: number | null;
	maxAmount: number | null;
	couponExpired: boolean | null;
	couponUsed: boolean | null;
};

export type Cart = {
	cartId: string;
	userId: string | null;
	orderNumber: string | null;
	discount: number;
	coupon: Coupon | null;
	subtotal: number;
	total: number;
	products: CartItem[];
	createdAt: Date;
	updatedAt: Date;
};
