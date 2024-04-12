import algoliasearch from 'algoliasearch';
import { PUBLIC_ALGOLIA_APP_ID, PUBLIC_ALGOLIA_SEARCH_KEY } from '$env/static/public';

export interface FilterValue {
	name: string;
	slug: string;
}

export interface Filters {
	categories: FilterValue[];
	tags: FilterValue[];
	prices: FilterValue[];
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
	// Create an array of numeric filters based on the prices array
	const numericFilters: string[] = filters.prices.map((price) => {
		// Check if the price is over a certain value
		if (price.slug === 'over-100') {
			// Get the lower bound of the price range and convert it to cents
			const lowerBound = Number(price.slug.split('-')[1]) * 100;
			return `price >= ${lowerBound}`;
		}

		// Get the lower and upper bounds of the price range from the slug and convert them to cents
		const [lowerBound, upperBound] = price.slug.split('-').map((value) => Number(value) * 100);

		// Return a numeric filter for the price range
		return `price:${lowerBound} TO ${upperBound}`;
	});

	// Create an array of facet filters based on the categories and tags arrays
	const facetFilters: string[] = [
		...filters.categories.map((category) => `categories:${category.name}`),
		...filters.tags.map((tag) => `tags:${tag.name}`)
	];

	// Perform a search with the facet filters and numeric filters
	const products = await index.search(query, {
		facetFilters: facetFilters,
		numericFilters: numericFilters
	});

	console.log(products);
	return products;
};
