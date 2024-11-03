import { client } from "../../db/connection.js";

export const cancelSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the subscription from the subscriptions table
    const deleteResult = await client.query(
      "DELETE FROM subscriptions WHERE userid = $1",
      [id]
    );

    if (deleteResult.rowCount > 0) {
      // Update the is_subscribed field in the users table
      const updateResult = await client.query(
        "UPDATE users SET is_subscribed = FALSE WHERE id = $1",
        [id]
      );

      if (updateResult.rowCount > 0) {
        res.status(200).json({
          message: "Subscription cancelled successfully",
          success: 1,
        });
      } else {
        res
          .status(500)
          .json({
            message: "Failed to update user subscription status",
            success: 0,
          });
      }
    } else {
      res
        .status(404)
        .json({ message: "User not found in subscriptions", success: 0 });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal server error", success: 0 });
  }
};
