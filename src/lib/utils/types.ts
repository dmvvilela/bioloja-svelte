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
