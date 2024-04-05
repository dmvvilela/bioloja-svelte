import products from '../data/exported_products.json';

const keys = Object.keys(products[0]);
console.log(products[0]);

const path = './data/parsed_products.json';
await Bun.write(path, keys.join('\n'));
