import { client } from "../../db/connection.js";

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query(
      "DELETE FROM blogs WHERE id = $1 RETURNING *",
      [id]
    );

    // Check if a post was deleted
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Send response back with the deleted post data
    res.status(200).json({ message: "Blog deleted successfullt" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Failed to delete post" });
  }
};
