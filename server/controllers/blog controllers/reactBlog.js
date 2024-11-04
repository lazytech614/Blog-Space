import { client } from "../../db/connection.js";

export const reactBlog = async (req, res) => {
  const { userId, postId } = req.params;
  const { isLike } = req.body; // `isLike` will be true for like, false for dislike

  try {
    // Check if the user has already liked or disliked the post
    const result = await client.query(
      "SELECT * FROM likes_dislikes WHERE user_id = $1 AND post_id = $2",
      [userId, postId]
    );

    if (result.rows.length > 0) {
      // Entry exists, so update the is_like value to toggle like/dislike
      const updateQuery = `
        UPDATE likes_dislikes 
        SET is_like = $1, created_at = CURRENT_TIMESTAMP 
        WHERE user_id = $2 AND post_id = $3
        RETURNING *;
      `;
      const updatedResult = await client.query(updateQuery, [
        isLike,
        userId,
        postId,
      ]);
      res.status(200).json({
        success: 1,
        message: isLike ? "Post liked." : "Post disliked.",
        data: updatedResult.rows[0],
      });
    } else {
      // No entry exists, so insert a new like/dislike record
      const insertQuery = `
        INSERT INTO likes_dislikes (user_id, post_id, is_like) 
        VALUES ($1, $2, $3) 
        RETURNING *;
      `;
      const insertResult = await client.query(insertQuery, [
        userId,
        postId,
        isLike,
      ]);
      res.status(201).json({
        success: 1,
        message: isLike ? "Post liked." : "Post disliked.",
        data: insertResult.rows[0],
      });
    }
  } catch (error) {
    console.error("Error updating like/dislike status:", error);
    res.status(500).json({ success: 0, message: "Internal server error." });
  }
};
