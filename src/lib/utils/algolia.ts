import algoliasearch from 'algoliasearch';
import { PUBLIC_ALGOLIA_APP_ID, PUBLIC_ALGOLIA_SEARCH_KEY } from '$env/static/public';

export interface Filters {
	categories: string[];
	tags: string[];
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

// TODO: Doesn't check if published (don't care for now..)
export const searchProduct = async (query: string) => {
	const { hits } = await index.search(query);
	return hits;
};

// TODO: Paginate
export const searchProducts = async (query = '', filters: Filters) => {
	// Convert the slider values from dollars to cents
	const minPrice = (filters.prices.min || 0) * 100;
	const maxPrice = (filters.prices.max || 1e9) * 100;

	// Create numeric filters based on the slider values
	const discountPriceFilter = `discountPrice:${minPrice} TO ${maxPrice}`;
	const priceFilter = `price:${minPrice} TO ${maxPrice}`;

	// Create an array of facet filters based on the categories and tags arrays
	const facetFilters: string[] = [
		...filters.categories.map((category) => `categories.slug:${category}`),
		...filters.tags.map((tag) => `tags.slug:${tag}`),
		'published:true'
	];

	// Perform separate searches for products with a discountPrice and products without a discountPrice
	const [discountPriceResults, priceResults] = await Promise.all([
		index.search(query, {
			numericFilters: [discountPriceFilter],
			facetFilters: facetFilters
			// sort: 'price:asc'
		}),
		index.search(query, {
			numericFilters: [priceFilter],
			facetFilters: facetFilters
			// sort: 'price:asc'
		})
	]);

	// Combine the results
	const products = [...discountPriceResults.hits, ...priceResults.hits];

	// Deduplicate the results
	const uniqueProducts = [];
	const productIds = new Set();
	for (const product of products) {
		if (!productIds.has(product.objectID)) {
			productIds.add(product.objectID);
			uniqueProducts.push(product);
		}
	}

	return uniqueProducts;
};

export async function getFacetCounts(query = '') {
	// Perform a search without a query
	const result = await index.search(query, {
		facets: ['categories.slug', 'tags.slug']
	});

	// The facets property of the result contains the count of each category and tag
	const categoryCounts = result.facets?.['categories.slug'];
	const tagCounts = result.facets?.['tags.slug'];

	return { categoryCounts, tagCounts };
}

export async function getFacetCountsWithFilters(query = '', filters: Filters) {
	// Convert the slider values from dollars to cents
	const minPrice = (filters.prices.min || 0) * 100;
	const maxPrice = (filters.prices.max || 1e9) * 100; // 1e9 is 1 billion

	// Create a numeric filter based on the slider values
	const priceFilter = `price:${minPrice} TO ${maxPrice}`;

	// Create an array of facet filters based on the categories and tags arrays
	const facetFilters: string[] = [
		...filters.categories.map((category) => `categories.slug:${category}`),
		...filters.tags.map((tag) => `tags.slug:${tag}`),
		'published:true'
	];

	// Perform a search with the numeric filter and facet filters, and request the categories and tags facets
	const result = await index.search(query, {
		numericFilters: [priceFilter],
		facetFilters: facetFilters,
		facets: ['categories.slug', 'tags.slug']
	});

	// The facets property of the result contains the count of each category and tag
	const categoryCounts = result.facets?.['categories.slug'];
	const tagCounts = result.facets?.['tags.slug'];

	return { categoryCounts, tagCounts };
}

// OR filter
// async function searchProducts(filters: Filters) {
//   // Convert the slider values from dollars to cents
//   let minPrice = (filters.prices.min || 0) * 100;
//   let maxPrice = (filters.prices.max || 1e9) * 100; // 1e9 is 1 billion

//   // Create a numeric filter based on the slider values
//   let priceFilter = `price:${minPrice} TO ${maxPrice}`;

//   // Create an array of facet filters based on the categories and tags arrays
//   let facetFilters: string[][] = [
//     ...filters.categories.map(category => [`categories:${category.slug}`]),
//     ...filters.tags.map(tag => [`tags:${tag.slug}`])
//   ];

//   // Perform a search with the numeric filter and facet filters
//   return await index.search(query, {
//     numericFilters: [priceFilter],
//     facetFilters: facetFilters
//   });
// }
