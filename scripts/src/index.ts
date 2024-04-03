/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
	ListBucketsCommand,
	ListObjectsV2Command,
	PutObjectCommand,
	type PutObjectCommandInput,
	S3Client
} from '@aws-sdk/client-s3';
import products from '../data/exported_products.json';
import fs from 'fs';
import md5 from 'md5';

const {
	CLOUDFLARE_ACCOUNT_ID: cloudflareAccountId,
	CLOUDFLARE_R2_ACCESS_KEY_ID: cloudflareR2AccessKeyId,
	CLOUDFLARE_R2_SECRET_ACCESS_KEY: cloudflareR2SecretAccessKey,
	CLOUDFLARE_R2_BUCKET_NAME: cloudflareR2BucketName
} = Bun.env;

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

const getFileList: any = (dirName: fs.PathLike) => {
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

const files: string[] = getFileList('/Users/danvilela/Code/Bioloja/materiais zip');
console.log(files.length);

let fileName = '';
const errorFiles = [];
for (const file of files) {
	try {
		const fileStream = fs.readFileSync(file);
		fileName = file.replace('/Users/danvilela/Code/Bioloja/materiais zip/', '');

		if (fileName.includes('.DS_Store')) continue;

		console.log(fileName);

		const uploadParams: PutObjectCommandInput = {
			Bucket: cloudflareR2BucketName,
			Key: fileName,
			Body: fileStream,
			ContentLength: fs.statSync(file).size,
			ContentType: 'application/octet-stream'
		};

		const cmd = new PutObjectCommand(uploadParams);

		const digest = md5(fileStream);

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

// const keys = Object.keys(products[0]);

// console.log(products[0]);

// const path = './data/parsed_products.json';
// await Bun.write(path, keys.join('\n'));
