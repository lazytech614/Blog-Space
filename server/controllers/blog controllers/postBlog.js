import { client } from "../../db/connection.js";

export const postBlog = async (req, res) => {
  const { title, post, category } = req.body;
  const imageUrl = encodeURIComponent(req.file.filename);
  try {
    await client.query(
      "INSERT INTO blogs (title, image, post, category) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, imageUrl, post, category]
    );
    res.status(200).json({ message: "Blog uploaded successfully", success: 1 });
  } catch (err) {
    console.error("Error saving blog post:", err);
    res.status(500).json({ error: "Failed to save blog post" });
  }
};
