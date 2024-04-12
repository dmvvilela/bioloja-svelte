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
	// Convert the slider values from dollars to cents
	const minPrice = (filters.prices.min || 0) * 100;
	const maxPrice = (filters.prices.max || 1e9) * 100;

	// Create numeric filters based on the slider values
	const discountPriceFilter = `discountPrice:${minPrice} TO ${maxPrice}`;
	const priceFilter = `price:${minPrice} TO ${maxPrice}`;

	// Create an array of facet filters based on the categories and tags arrays
	const facetFilters: string[] = [
		...filters.categories.map((category) => `categories:${category.slug}`),
		...filters.tags.map((tag) => `tags:${tag.slug}`)
	];

	// Perform separate searches for products with a discountPrice and products without a discountPrice
	const [discountPriceResults, priceResults] = await Promise.all([
		index.search(query, {
			numericFilters: [discountPriceFilter],
			facetFilters: facetFilters
		}),
		index.search('', {
			numericFilters: [priceFilter],
			facetFilters: facetFilters
		})
	]);

	// Combine the results
	const products = [...discountPriceResults.hits, ...priceResults.hits];
	return products;
};

export async function getFacetCounts() {
	// Perform a search without a query
	const result = await index.search('', {
		facets: ['categories', 'tags']
	});

	// The facets property of the result contains the count of each category and tag
	const categoryCounts = result.facets?.categories;
	const tagCounts = result.facets?.tags;

	return { categoryCounts, tagCounts };
}
