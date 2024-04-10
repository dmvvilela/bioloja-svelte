// General
export type DownloadLink = {
	url: string;
	name: string;
};

export type Tag = {
	name: string;
	slug: string;
};

export type Attribute = {
	name: string;
	slug: string;
	type: 'number' | 'boolean' | 'string';
	valueText?: string | null;
	valueNumber?: number | null;
	valueBoolean?: boolean | null;
};

// ORM queries
export type Product = {
	id: number;
	slug: string;
	name: string;
	published: boolean;
	featured: boolean;
	shortDescription: string;
	description: string;
	price: number;
	discountPrice?: number;
	discountExpiresAt?: Date;
	imageUrls: string;
	downloadLinks: DownloadLink[];
	createdAt: Date;
	updatedAt: Date;
};

export type ProductCategory = {
	productId: number;
	categoryId: number;
};

export type Category = {
	id: number;
	parentId?: number;
	slug: string;
	name: string;
};

export type ProductWithCategory = {
	products: Product;
	categories: Category;
	product_categories: ProductCategory;
};

export type ProductType = {
	productId: number;
	productName: string;
	productSlug: string;
	imageUrls: string;
	price: number;
	discountPrice?: number | null;
	discountExpiresAt?: Date | null;
	categoryId: number;
	categoryName: string;
	parentCategoryId?: number | null;
	parentCategoryName?: string | null;
};

// Raw SQL queries
export type ProductWithCategories = {
	id: number;
	slug: string;
	name: string;
	published: boolean;
	featured: boolean;
	short_description: string;
	description: string;
	price: number;
	discount_price?: number;
	discount_expires_at?: Date;
	image_urls: string;
	download_links: DownloadLink[];
	category_names: string[];
	category_slugs: string[];
	category_ids: number[];
	created_at: Date;
	updated_at: Date;
};

export interface Order {
	order_number: string;
	order_status: string;
	order_date: string;
	billing_first_name: string;
	billing_last_name: string;
	billing_company: string;
	billing_address: string;
	billing_city: string;
	billing_state: string;
	billing_postcode: string;
	billing_country: string;
	billing_email: string;
	billing_phone: string;
	payment_method_title: string;
	cart_discount: string;
	order_subtotal: number;
	order_refund: number;
	order_total: string;
	products: OrderProduct[];
	coupons: Coupon[];
}

export interface OrderProduct {
	sku: string;
	line_id: number;
	name: string;
	qty_minus_refund: number;
	item_price: number;
}

export interface Coupon {
	code: string;
	discount_amount: string;
	discount_percentage?: number; // not on wp
}
