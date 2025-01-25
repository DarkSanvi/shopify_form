import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "desyvupiz", // Replace with your Cloudinary Cloud Name
  api_key: 478436724351967",       // Replace with your Cloudinary API Key
  api_secret: "081gu3Qmsa9Eb0hm7DudFw2II-g", // Replace with your Cloudinary API Secret
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const file = req.body.file; // Expect base64 or file data

    try {
      const result = await cloudinary.v2.uploader.upload(file, {
        folder: "uploads",
      });

      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      res.status(500).json({ error: "Failed to upload image." });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
if (!file) {
  return res.status(400).json({ error: "No file provided." });
}

