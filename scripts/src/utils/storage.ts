/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
	ListBucketsCommand,
	ListObjectsV2Command,
	PutObjectCommand,
	type PutObjectCommandInput,
	S3Client
} from '@aws-sdk/client-s3';
import fs from 'fs';
import md5 from 'md5';
import path from 'path';

const {
	CLOUDFLARE_ACCOUNT_ID: cloudflareAccountId,
	CLOUDFLARE_R2_ACCESS_KEY_ID: cloudflareR2AccessKeyId,
	CLOUDFLARE_R2_SECRET_ACCESS_KEY: cloudflareR2SecretAccessKey
} = Bun.env;

export const slidesBucket = 'bioloja-slides';

// @ts-ignore
const S3 = new S3Client({
	region: 'auto',
	endpoint: `https://${cloudflareAccountId}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: cloudflareR2AccessKeyId,
		secretAccessKey: cloudflareR2SecretAccessKey
	}
});

// console.log(await S3.send(new ListBucketsCommand('')));
// console.log(await S3.send(new ListObjectsV2Command({ Bucket: cloudflareR2BucketName })));

export const getFileList: any = (dirName: fs.PathLike) => {
	let files: any[] = [];
	const items = fs.readdirSync(dirName, { withFileTypes: true });

	for (const item of items) {
		if (item.isDirectory()) {
			files = [...files, ...getFileList(`${dirName}/${item.name}`)];
		} else {
			files.push(`${dirName}/${item.name}`);
		}
	}

	return files;
};

export const getSlidesFileList: any = (dirName: string) => {
	let files: any[] = [];
	const items = fs.readdirSync(dirName, { withFileTypes: true });

	for (const item of items) {
		const fullPath = path.join(dirName, item.name);

		if (item.isDirectory()) {
			files = [...files, ...getSlidesFileList(fullPath)];
		} else {
			const fileName = path.basename(fullPath);
			const parentDirName = path.basename(path.dirname(fullPath));

			// Check if the file name matches the pattern SlideXX.YY or slideXX.YY
			if (/^slide\d+\.\w+$/i.test(fileName)) {
				let newFilePath;

				// If the parent directory is not "slides", change it to "slides"
				if (parentDirName.toLowerCase() !== 'slides') {
					const grandParentDir = path.dirname(path.dirname(fullPath));
					newFilePath = path.join(grandParentDir, 'slides', fileName.toLowerCase());
				} else {
					newFilePath = path.join(path.dirname(fullPath), fileName.toLowerCase());
				}

				// Push the original file path and new file path to the array
				files.push({ originalFilePath: fullPath, newFilePath });
			}
		}
	}

	return files;
};

export const getFirst10SlidesPerPrefix = (fileList: any[]) => {
	// Group the files by their prefix
	const fileGroups = fileList.reduce((groups, file) => {
		const prefix = file.newFilePath.match(/(.*\/slide)\d/i)[1];
		if (!groups[prefix]) {
			groups[prefix] = [];
		}
		groups[prefix].push(file);
		return groups;
	}, {});

	// Sort each group of files and pick the first 10
	for (const prefix in fileGroups) {
		fileGroups[prefix].sort((a: any, b: any) => {
			const numA = parseInt(a.newFilePath.match(/slide(\d+)/i)[1]);
			const numB = parseInt(b.newFilePath.match(/slide(\d+)/i)[1]);
			return numA - numB;
		});
		fileGroups[prefix] = fileGroups[prefix].slice(0, 10);
	}

	// Flatten the groups into a single array
	const first10Files = Object.values(fileGroups).flat();

	return first10Files as any;
};

export const getErrorFileList: any = async (dirName: fs.PathLike) => {
	const errorFilesTxt = await Bun.file('./data/error_files.txt').text();
	const fileList = errorFilesTxt.split('\n');
	const files: any[] = [];

	for (const file of fileList) {
		files.push(`${dirName}${file}`);
	}

	return files;
};

export const uploadFiles = async (bucket: string, path: string, files: string[]) => {
	let fileName = '';
	const errorFiles = [];

	for (const file of files) {
		try {
			const fileStream = fs.readFileSync(file);
			fileName = file.replace(path, '');

			if (fileName.includes('.DS_Store')) continue;
			console.log(fileName);

			const uploadParams: PutObjectCommandInput = {
				Bucket: bucket,
				Key: fileName,
				Body: fileStream,
				ContentLength: fs.statSync(file).size,
				ContentType: 'application/octet-stream'
			};

			const cmd = new PutObjectCommand(uploadParams);
			const digest = md5(fileStream);

			// Check if the file already exists in the bucket (code 412)
			cmd.middlewareStack.add(
				(next: any) => async (args: any) => {
					args.request.headers['if-none-match'] = `"${digest}"`;
					return await next(args);
				},
				{
					step: 'build',
					name: 'addETag'
				}
			);

			const data = await S3.send(cmd);
			console.log(`Success - Status Code: ${data.$metadata.httpStatusCode}`);
		} catch (err: any) {
			if (Object.prototype.hasOwnProperty.call(err, '$metadata')) {
				if (err.$metadata.httpStatusCode === 412) {
					console.error(`Error - File already exists`);
				} else {
					errorFiles.push(fileName);
					console.error(`Error - Status Code: ${err.$metadata.httpStatusCode} - ${err.message}`);
				}
			} else {
				console.error('Error', err);
				errorFiles.push(fileName);
			}
		}
	}

	await Bun.write('./data/error_files.txt', errorFiles.join('\n'));
};

export const uploadRenamedFiles = async (
	bucket: string,
	path: string,
	files: { originalFilePath: string; newFilePath: string }[]
) => {
	let fileName = '';
	const errorFiles = [];

	for (const file of files) {
		try {
			const fileStream = fs.readFileSync(file.originalFilePath);
			fileName = file.newFilePath.replace(path, '');
			console.log(fileName);

			const uploadParams: PutObjectCommandInput = {
				Bucket: bucket,
				Key: fileName,
				Body: fileStream,
				ContentLength: fs.statSync(file.originalFilePath).size,
				ContentType: 'application/octet-stream'
			};

			const cmd = new PutObjectCommand(uploadParams);
			const digest = md5(fileStream);

			// Check if the file already exists in the bucket (code 412)
			cmd.middlewareStack.add(
				(next: any) => async (args: any) => {
					args.request.headers['if-none-match'] = `"${digest}"`;
					return await next(args);
				},
				{
					step: 'build',
					name: 'addETag'
				}
			);

			const data = await S3.send(cmd);
			console.log(`Success - Status Code: ${data.$metadata.httpStatusCode}`);
		} catch (err: any) {
			if (Object.prototype.hasOwnProperty.call(err, '$metadata')) {
				if (err.$metadata.httpStatusCode === 412) {
					console.error(`Error - File already exists`);
				} else {
					errorFiles.push(file.originalFilePath);
					console.error(`Error - Status Code: ${err.$metadata.httpStatusCode} - ${err.message}`);
				}
			} else {
				console.error('Error', err);
				errorFiles.push(file.originalFilePath);
			}
		}
	}

	await Bun.write('./data/error_files.txt', errorFiles.join('\n'));
};
