import algoliasearch from 'algoliasearch';
import { PUBLIC_ALGOLIA_APP_ID, PUBLIC_ALGOLIA_SEARCH_KEY } from '$env/static/public';

export interface FilterValue {
	name: string;
	slug: string;
}

export interface Filters {
	categories: FilterValue[];
	tags: FilterValue[];
	prices: { min?: number; max?: number };
}

export type AlgoliaProduct = {
	id: number;
	slug: string;
	name: string;
	published: boolean;
	featured: boolean;
	shortDescription: string;
	description: string;
	price: number;
	discountPrice: number | null;
	discountExpiresAt: string | null;
	imageUrls: string[];
	categories: string[];
	tags: string[];
	attributes: {
		[key: string]: boolean | number | string;
	};
};

const client = algoliasearch(PUBLIC_ALGOLIA_APP_ID, PUBLIC_ALGOLIA_SEARCH_KEY);
const index = client.initIndex('products');

export const search = async (query: string) => {
	index.search(query).then(({ hits }) => {
		console.log(hits);
	});
};

export const searchProducts = async (filters: Filters, query = '') => {
	let numericFilter: string | undefined;

	// Check if a price filter is set
	if (filters.prices.min || filters.prices.max) {
		// Convert the slider values from dollars to cents
		const minPrice = (filters.prices.min || 0) * 100;
		const maxPrice = (filters.prices.max || Infinity) * 100;

		// Create a numeric filter based on the slider values
		numericFilter = `price:${minPrice} TO ${maxPrice}`;
	}

	// Create an array of facet filters based on the categories and tags arrays
	const facetFilters: string[] = [
		...filters.categories.map((category) => `categories:${category.name}`),
		...filters.tags.map((tag) => `tags:${tag.name}`)
	];

	// Perform a search with the facet filters and numeric filters
	const products = await index.search(query, {
		facetFilters: facetFilters,
		numericFilters: numericFilter ? [numericFilter] : undefined
	});

	console.log(products);
	return products;
};
