const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'desyvupiz',
  api_key: '478436724351967',
  api_secret: '081gu3Qmsa9Eb0hm7DudFw2II-g',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const file = req.body.file; // Expect base64 or file data

    try {
      const result = await cloudinary.uploader.upload(file, {
        folder: 'uploads',
      });

      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      res.status(500).json({ error: 'Failed to upload image.' });
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
