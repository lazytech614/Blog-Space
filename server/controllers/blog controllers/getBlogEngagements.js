import { client } from "../../db/connection.js";

export const getBlogEngagement = async (req, res) => {
  const { blogId } = req.params;

  try {
    const query = `
      SELECT 
        blogs.id,
        blogs.title,
        blogs.post,
        COUNT(CASE WHEN likes_dislikes.is_like = true THEN 1 END) AS like_count,
        COUNT(CASE WHEN likes_dislikes.is_like = false THEN 1 END) AS dislike_count,
        COUNT(comments.comment_id) AS comment_count
      FROM blogs
      LEFT JOIN likes_dislikes ON blogs.id = likes_dislikes.post_id
      LEFT JOIN comments ON blogs.id = comments.post_id
      WHERE blogs.id = $1
      GROUP BY blogs.id;
    `;

    const result = await client.query(query, [blogId]);

    if (result.rows.length > 0) {
      res.status(200).json({
        success: 1,
        message: "Blog engagement data retrieved successfully.",
        data: result.rows[0],
      });
    } else {
      res.status(404).json({
        success: 0,
        message: "Blog not found.",
      });
    }
  } catch (error) {
    console.error("Error retrieving post engagement data:", error);
    res.status(500).json({ success: 0, message: "Internal server error." });
  }
};
