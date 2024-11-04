import { client } from "../../db/connection.js";

export const getComments = async (req, res) => {
  const { blogId } = req.params;

  try {
    const query = `
      SELECT comments.comment_id, comments.content, comments.created_at, users.name 
      FROM comments 
      JOIN users ON comments.user_id = users.id
      WHERE comments.post_id = $1
      ORDER BY comments.created_at ASC;
    `;

    const result = await client.query(query, [blogId]);

    res.status(200).json({
      success: 1,
      message: "Comments retrieved successfully.",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error retrieving comments:", error);
    res.status(500).json({ success: 0, message: "Internal server error." });
  }
};
