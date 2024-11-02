import { client } from "../db/connection.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcrypt";

export const signIn = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Please provide all data" });

  try {
    const result = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "No user found" });

    const user = result.rows[0];

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: "Incorrect password", success: 0 });
    }

    generateTokenAndSetCookie(user.username, res);

    res.status(200).json({ message: "Logged in successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
