export type CartItem = {
	id: number;
	name: string;
	slug: string;
	categories: string[];
	lineId: number;
	price: number;
	discountPrice: number | null;
	imageUrls: string;
	downloadLinks: string;
};

export type CartCoupon = {
	code: string;
	value: number;
	type: string;
	minAmount: number | null;
	maxAmount: number | null;
	couponUsed: boolean | null;
	couponExpired: boolean;
	userCouponUsed: boolean;
};

export type Cart = {
	cartId: string;
	userId: string | null;
	userName: string | null;
	orderNumber?: string | null;
	couponDiscount: number | null;
	productsDiscount: number | null;
	coupon?: CartCoupon | null;
	subtotal: number;
	total: number;
	products: CartItem[];
	createdAt?: Date;
	updatedAt?: Date;
};
