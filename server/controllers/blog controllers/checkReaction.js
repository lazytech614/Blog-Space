import { client } from "../../db/connection.js";

export const checkReaction = async (req, res) => {
  const { userId, postId } = req.params;
  try {
    const result = await client.query(
      "SELECT * FROM likes_dislikes WHERE user_id = $1 AND post_id = $2",
      [userId, postId]
    );
    if (result.rows.length > 0) {
      res.status(200).json({
        success: 1,
        status: result.rows[0].is_like,
        message: "Reaction retrieved successfully",
      });
    } else {
      res.status(200).json({
        success: 1,
        status: "none",
        message: "Reaction retrieved successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: 0,
      message: "Internal server error",
    });
  }
};
