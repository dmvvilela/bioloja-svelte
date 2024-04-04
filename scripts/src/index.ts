import {
	getErrorFileList,
	getFileList,
	getFirst10SlidesPerPrefix,
	getSlidesFileList,
	uploadFiles
} from './utils/storage';
import products from '../data/exported_products.json';

const path = '/Users/danvilela/Code/Bioloja/materiais zip/';
const files: string[] = getFileList(path);
// const files: string[] = await getErrorFileList(path);
console.log(files.length);

const slides = getSlidesFileList(path + 'Anatomia e Fisiologia Humanas/Ensino Médio');
const first10Slides = getFirst10SlidesPerPrefix(slides);
console.log(first10Slides.length);
// await uploadFiles(path, files);

// const keys = Object.keys(products[0]);
// console.log(products[0]);

// const path = './data/parsed_products.json';
// await Bun.write(path, keys.join('\n'));
