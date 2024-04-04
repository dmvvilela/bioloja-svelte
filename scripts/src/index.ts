import {
	getErrorFileList,
	getFileList,
	getFirst10SlidesPerPrefix,
	getSlidesFileList,
	slidesBucket,
	uploadFiles,
	uploadRenamedFiles
} from './utils/storage';
import products from '../data/exported_products.json';

const path = '/Users/danvilela/Code/Bioloja/materiais zip/';
// const files: string[] = getFileList(path);
// console.log(files.length);
// await uploadFiles(path, files);
// const files: string[] = await getErrorFileList(path);

const slides = getSlidesFileList(path);
const first10Slides = getFirst10SlidesPerPrefix(slides);
console.log(first10Slides.length);
await uploadRenamedFiles(slidesBucket, path, first10Slides);

// const keys = Object.keys(products[0]);
// console.log(products[0]);

// const path = './data/parsed_products.json';
// await Bun.write(path, keys.join('\n'));
