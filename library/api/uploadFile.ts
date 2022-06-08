import axios from 'axios';

export const uploadFileToS3 = async (file: File, path?: string) => {
  try {
    const {
      data: { url },
    } = await axios.post(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/s3/upload`,
      {
        name: file.name,
        type: file.type,
        path,
      },
    );
    await axios.put(url, file, {
      headers: {
        'Content-type': file.type,
        'Access-Control-Allow-Origin': '*',
      },
    });
    return url;
  } catch (error) {
    console.log('업로드에 문제 발생');
  }
};
