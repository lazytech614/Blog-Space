import { client } from "../../db/connection.js";

export const deleteUser = async (req, res) => {
  const { id } = req.params; // Assuming the user's id is passed as a URL parameter

  try {
    const result = await client.query("DELETE FROM users WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found", success: 0 });
    }

    return res
      .status(200)
      .json({ message: "User deleted successfully", success: 1 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: 0 });
  }
};
