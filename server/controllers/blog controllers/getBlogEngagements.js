import { client } from "../../db/connection.js";

export const getBlogEngagement = async (req, res) => {
  const { blogId } = req.params;

  try {
    const query = `
      SELECT 
    blogs.id,
    blogs.title,
    blogs.post,
    COALESCE(like_data.like_count, 0) AS like_count,
    COALESCE(like_data.dislike_count, 0) AS dislike_count,
    COALESCE(comment_data.comment_count, 0) AS comment_count
  FROM blogs
  LEFT JOIN (
    SELECT post_id,
           SUM(CASE WHEN is_like = true THEN 1 ELSE 0 END) AS like_count,
           SUM(CASE WHEN is_like = false THEN 1 ELSE 0 END) AS dislike_count
    FROM likes_dislikes
    GROUP BY post_id
  ) AS like_data ON blogs.id = like_data.post_id
  LEFT JOIN (
    SELECT post_id, COUNT(comment_id) AS comment_count
    FROM comments
    GROUP BY post_id
  ) AS comment_data ON blogs.id = comment_data.post_id
  WHERE blogs.id = $1;
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
