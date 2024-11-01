import { client } from "../db/connection.js";

export const postBlog = async (req, res) => {
  //   console.log(req.file);
  const { title, post } = req.body;
  const imageUrl = encodeURIComponent(req.file.filename);
  try {
    const result = await client.query(
      "INSERT INTO blogs (title, image, post) VALUES ($1, $2, $3) RETURNING *",
      [title, imageUrl, post]
    );
    res.status(200).json({ data: result.rows[0], success: 1 });
  } catch (err) {
    console.error("Error saving blog post:", err);
    res.status(500).json({ error: "Failed to save blog post" });
  }
};
