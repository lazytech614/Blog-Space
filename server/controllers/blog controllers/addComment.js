import { client } from "../../db/connection.js";

export const addComment = async (req, res) => {
  const { userId, blogId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({
      success: 0,
      message: "Comment content is required.",
    });
  }

  try {
    const insertQuery = `
      INSERT INTO comments (user_id, post_id, content) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;

    const result = await client.query(insertQuery, [userId, blogId, content]);

    res.status(201).json({
      success: 1,
      message: "Comment added successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ success: 0, message: "Internal server error." });
  }
};
