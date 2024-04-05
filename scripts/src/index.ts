import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import products from '../data/exported_products.json';
import slugify from 'slugify';
import * as schema from '../../src/lib/server/db/schema';

declare module 'bun' {
	interface Env {
		PG_CONN_DEV: string;
		PG_CONN_PROD: string;
	}
}

// Since this is a local script we use Bun to facilitate.
const sql = neon(Bun.env.PG_CONN_DEV);
const db = drizzle(sql);

for (const product of products) {
	const slug = slugify(product.Nome, {
		lower: true,
		strict: true,
		locale: 'pt'
	});

	await db.insert(schema.products).values({
		slug: slug,
		name: product.Nome,
		published: Boolean(product.Publicado),
		featured: Boolean(product['Em destaque?']),
		shortDescription: product['Descrição curta'],
		description: product.Descrição,
		price: Math.round(parseFloat(product.Preço.toString().replace(',', '.')) * 100),
		discountPrice:
			product['Preço promocional'] && product['Preço promocional'] !== ''
				? Math.round(parseFloat(product['Preço promocional'].toString().replace(',', '.')) * 100)
				: null
	});
}
// const keys = Object.keys(products[0]);
// console.log(products[0]);

// const path = './data/parsed_products.json';
// await Bun.write(path, keys.join('\n'));
