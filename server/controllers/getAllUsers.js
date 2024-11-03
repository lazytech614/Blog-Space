import { client } from "../db/connection.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = (await client.query("SELECT * FROM users")).rows;

    res.status(200).json({ users });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
