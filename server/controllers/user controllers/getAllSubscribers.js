import { client } from "../../db/connection.js";

export const getAllSubscribers = async (req, res) => {
  try {
    const result = await client.query(
      `SELECT users.id, users.name, users.email, subscriptions.subscribed_at 
       FROM users 
       JOIN subscriptions ON users.id = subscriptions.userid 
       WHERE users.is_subscribed = TRUE`
    );

    if (result.rows.length > 0) {
      res.status(200).json({ subscribers: result.rows, success: 1 });
    } else {
      res.status(404).json({ message: "No subscribers found", success: 0 });
    }
  } catch (err) {
    console.error("Error fetching subscribers:", err.stack);
    res.status(500).json({ message: "Internal server error", success: 0 });
  }
};
