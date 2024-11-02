import { client } from "../db/connection.js";

export const getAllBlogs = async (req, res) => {
  const data = await client.query("SELECT * FROM blogs");
  res.status(200).json(data.rows);
};
