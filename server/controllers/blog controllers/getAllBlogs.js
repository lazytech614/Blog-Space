import { client } from "../../db/connection.js";

export const getAllBlogs = async (req, res) => {
  try {
    const { rows } = await client.query("SELECT * FROM blogs");
    res.status(200).json({ data: rows, success: 1 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Internal server error", success: 0 });
  }
};
