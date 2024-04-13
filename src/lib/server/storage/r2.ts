/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import {
	CLOUDFLARE_ACCOUNT_ID,
	CLOUDFLARE_R2_ACCESS_KEY_ID,
	CLOUDFLARE_R2_SECRET_ACCESS_KEY,
	DOWNLOADS_BUCKET_NAME
} from '$env/static/private';

// @ts-ignore
const S3 = new S3Client({
	region: 'auto',
	endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: CLOUDFLARE_R2_ACCESS_KEY_ID,
		secretAccessKey: CLOUDFLARE_R2_SECRET_ACCESS_KEY
	}
});

export const getProductUrlDownloadLink = async (fileName: string) => {
	return await getSignedUrl(
		S3,
		new GetObjectCommand({ Bucket: DOWNLOADS_BUCKET_NAME, Key: fileName }),
		{
			expiresIn: 60 // Expires in 1 minute.
		}
	);
};
