import {
	getFirst10SlidesPerPrefix,
	getSlidesFileList,
	slidesBucket,
	uploadRenamedFiles
} from '../../utils/storage';

const path = '/Users/danvilela/Code/Bioloja/materiais zip/';

const slides = getSlidesFileList(path);
const first10Slides = getFirst10SlidesPerPrefix(slides);

console.log(first10Slides.length);

await uploadRenamedFiles(slidesBucket, path, first10Slides);
