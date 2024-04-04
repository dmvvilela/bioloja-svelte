import {
	getErrorFileList,
	getFirst10SlidesPerPrefix,
	getSlidesFileList,
	slidesBucket,
	uploadRenamedFiles
} from '../../utils/storage';

const path = '/Users/danvilela/Code/Bioloja/materiais zip/';

// const slides = getSlidesFileList(path);
// const first10Slides = getFirst10SlidesPerPrefix(slides);

// console.log(first10Slides.length);

const files = [
	{
		originalFilePath:
			'/Users/danvilela/Code/Bioloja/materiais zip/Genética/Padrões de herança, interações gênicas e suas modificações/slides/Slide1.JPG',
		newFilePath:
			'/Users/danvilela/Code/Bioloja/materiais zip/Genética/Padrões de herança, interações gênicas e suas modificações/slides/slide1.jpg'
	}
];
await uploadRenamedFiles(slidesBucket, path, files);
