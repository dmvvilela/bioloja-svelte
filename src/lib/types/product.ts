export type AlgoliaProductType = {
	id: number;
	slug: string;
	name: string;
	published: boolean;
	featured: boolean;
	shortDescription: string;
	description: string;
	price: number;
	discountPrice: number;
	discountExpiresAt: Date | null;
	imageUrls: string[];
	categories: string[];
	tags: string[];
	attributes: {
		[key: string]: boolean | number;
	};
	objectID: string;
	_highlightResult: {
		name: HighlightResult;
		shortDescription: HighlightResult;
		categories: HighlightResult[];
		tags: HighlightResult[];
	};
};

export type HighlightResult = {
	value: string;
	matchLevel: string;
	matchedWords: string[];
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
	categorySlug: string;
	parentCategoryId?: number | null;
	parentCategoryName?: string | null;
};
