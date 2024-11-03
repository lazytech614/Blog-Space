import { client } from "../../db/connection.js";

export const checkSubscription = async (req, res) => {
  const { username } = req.params;
  try {
    const result = await client.query(
      "SELECT is_subscribed FROM users WHERE username = $1",
      [username]
    );
    if (result.rows.length > 0) {
      res.json({ isSubscribed: result.rows[0].is_subscribed });
    } else {
      res.status(404).json({ message: "User not found", success: 0 });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: 0 });
  }
};
