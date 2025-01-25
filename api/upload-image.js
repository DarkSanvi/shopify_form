import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "desyvupiz", // Replace with your Cloudinary Cloud Name
  api_key: "478436724351967", // Replace with your Cloudinary API Key
  api_secret: "081gu3Qmsa9Eb0hm7DudFw2II-g", // Replace with your Cloudinary API Secret
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed. Use GET instead." });
  }

  try {
    // Test by listing the first resource in your account
    const response = await cloudinary.v2.api.resources({ max_results: 1 });
    res.status(200).json({
      message: "Cloudinary credentials are working correctly!",
      firstResource: response.resources[0] || "No resources found.",
    });
  } catch (error) {
    console.error("Cloudinary Test Error:", error);
    res.status(500).json({
      error: "Cloudinary credentials failed. Check your configuration.",
      details: error.message,
    });
  }
}
