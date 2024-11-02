import { client } from "../db/connection.js";

export const subscribeUser = async (req, res) => {
  const { username } = req.params;
  try {
    const result = await client.query(
      "SELECT is_subscribed FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isSubscribed = result.rows[0].is_subscribed;
    if (isSubscribed) {
      return res.status(400).json({ message: "User is already subscribed!" });
    }

    await client.query(
      "UPDATE users SET is_subscribed = TRUE WHERE username = $1",
      [username]
    );

    return res.status(200).json({ message: "Subscription successful!" });
  } catch (error) {
    console.error("Error subscribing user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
