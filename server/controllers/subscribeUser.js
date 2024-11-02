import { client } from "../db/connection.js";

export const subscribeUser = async (req, res) => {
  const { email, username } = req.body;
  try {
    // Check if the user exists and is not subscribed
    const userQuery = `
      SELECT is_subscribed FROM users 
      WHERE email = $1 OR username = $2
    `;
    const { rows } = await client.query(userQuery, [email, username]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isSubscribed = rows[0].is_subscribed;

    if (isSubscribed) {
      return res.status(400).json({ message: "User is already subscribed!" });
    }

    // Update the user's subscription status to true
    const updateQuery = `
      UPDATE users 
      SET is_subscribed = TRUE 
      WHERE email = $1 OR username = $2
    `;
    await client.query(updateQuery, [email, username]);

    return res.status(200).json({ message: "Subscription successful!" });
  } catch (error) {
    console.error("Error subscribing user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
