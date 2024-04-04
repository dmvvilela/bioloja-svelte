import { getErrorFileList, getFileList, uploadFiles } from '../../utils/storage';

const path = '/Users/danvilela/Code/Bioloja/materiais zip/';

const files: string[] = getFileList(path);
// const files: string[] = await getErrorFileList(path);

console.log(files.length);

await uploadFiles('bioloja', path, files);
