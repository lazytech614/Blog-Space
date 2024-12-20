import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { client } from "../../db/connection.js";
import generateTokenAndSetCookie from "../../utils/generateToken.js";

export const signUp = async (req, res) => {
  const { name, username, email, password, confirmPassword } = req.body;

  if (!name || !username || !email || !password || !confirmPassword)
    return res.status(400).json({
      success: 0,
      message: "Please fill all the inputs",
    });

  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ message: "Passwords do not match", success: 0 });

  try {
    const userResult = await client.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (userResult.rows.length > 0)
      return res
        .status(400)
        .json({ message: "User already exists", success: 0 });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUserResult = await client.query(
      `INSERT INTO users (name, username, password, email) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, username, hashedPassword, email]
    );

    const newUser = newUserResult.rows[0];

    if (newUser) {
      generateTokenAndSetCookie(newUser.id, newUser.username, res);
      res.status(201).json({
        message: "New user created successfully",
        userId: newUser.id,
        success: 1,
      });
    } else {
      res.status(400).json({ message: "Invalid data", success: 0 });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: 0 });
  }
};
