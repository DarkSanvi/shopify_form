import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "desyvupiz", // Replace with your Cloudinary Cloud Name
  api_key: "478436724351967", // Replace with your Cloudinary API Key
  api_secret: "081gu3Qmsa9Eb0hm7DudFw2II-g", // Replace with your Cloudinary API Secret
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { file } = req.body;

  if (!file) {
    return res.status(400).json({ error: "No file provided." });
  }

  try {
    const result = await cloudinary.v2.uploader.upload(file, {
      folder: "uploads",
    });

    return res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return res.status(500).json({ error: "Failed to upload image." });
  }
}
