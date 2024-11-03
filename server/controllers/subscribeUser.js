import { client } from "../db/connection.js";

export const subscribeUser = async (req, res) => {
  const { username } = req.params;

  try {
    // Fetch user details
    const userDetails = await client.query(
      "SELECT email, id FROM users WHERE username = $1",
      [username]
    );

    // Check if user exists
    if (userDetails.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const { email, id } = userDetails.rows[0];

    // Check if the user is already subscribed
    const checkIsSubscribed = await client.query(
      "SELECT id FROM subscriptions WHERE username = $1",
      [username]
    );

    if (checkIsSubscribed.rows.length !== 0) {
      return res.status(409).json({ message: "User already subscribed" });
    }

    // Insert subscription details
    await client.query(
      "INSERT INTO subscriptions (email, username, userid) VALUES ($1, $2, $3)",
      [email, username, id]
    );

    // Update the user's subscription status
    await client.query(
      "UPDATE users SET is_subscribed = $1 WHERE username = $2",
      [true, username]
    );

    return res.status(200).json({ message: "Subscription successful!" });
  } catch (error) {
    console.error("Error subscribing user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
