import S3 from 'aws-sdk/clients/s3';
import { NextApiRequest, NextApiResponse } from 'next';

const s3 = new S3({
  region: process.env.NEXT_PUBLIC_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY as string,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY as string,
  },
  signatureVersion: 'v4',
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
  },
};

const postImage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, type, path } = req.body;

    const fileParams = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME + path,
      Key: name,
      ContentType: type,
      ACL: 'public-read',
    };

    const url = await s3.getSignedUrlPromise('putObject', fileParams);

    res.status(200).json({ url });
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error });
  }
};

export default postImage;
