import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { file } = req.body; // Expect base64 or file data

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'shopify_upload'); // Replace with your upload preset name

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/desyvupiz/image/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        res.status(200).json({ url: result.secure_url });
      } else {
        res.status(500).json({ error: result.error.message });
      }
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      res.status(500).json({ error: 'Failed to upload image.' });
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
