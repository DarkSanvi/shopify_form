import cloudinary from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.v2.config({
  cloud_name: process.env.desyvupiz,
  api_key: process.env.478436724351967,
  api_secret: process.env.081gu3Qmsa9Eb0hm7DudFw2II-g,
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed. Use GET.' });
  }

  try {
    // Attempt to fetch a list of resources to test the connection
    const result = await cloudinary.v2.api.resources({ max_results: 1 });
    res.status(200).json({
      message: 'Cloudinary connection successful!',
      resources: result.resources,
    });
  } catch (error) {
    console.error('Cloudinary connection error:', error);
    res.status(500).json({
      error: 'Failed to connect to Cloudinary. Check your credentials.',
      details: error.message,
    });
  }
}
