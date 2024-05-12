import { db } from './utils/database';
import { sql } from 'drizzle-orm';
import { products } from '../../src/lib/server/db/schema';

interface Product {
	name: string;
	price: number;
	discount_price: number;
	image: string;
	link: string;
}

const promotions = (
	await db.execute(
		sql`SELECT name, 
            price, 
            discount_price, 
            SPLIT_PART(image_urls, ',', 1) AS image, 
            'https://bioloja.bio.br/loja/produto/' || slug AS link
        FROM products
        WHERE discount_price IS NOT NULL 
        AND (discount_expires_at IS NULL OR discount_expires_at >= (CURRENT_DATE + INTERVAL '7 days'))
        ORDER BY RANDOM()
        LIMIT 4;`
	)
).rows;

console.log(promotions);

// function getMainProduct(promotions: Product[]) {
// 	// Parse price and discount_price as they are strings with comma as decimal separator
// 	promotions.forEach((promotion) => {
// 		promotion.price = parseFloat(promotion.price.replace(',', '.'));
// 		promotion.discount_price = parseFloat(promotion.discount_price.replace(',', '.'));
// 	});

// 	// Sort promotions array by discount in descending order
// 	promotions.sort((a, b) => b.price - b.discount_price - (a.price - a.discount_price));

// 	// Separate the main product and the rest
// 	let mainProduct = promotions[0];
// 	let products = promotions.slice(1);

// 	return { mainProduct, products };
// }

// let { mainProduct, products } = getMainProduct(promotions);
