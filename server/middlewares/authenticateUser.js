import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  console.log("Inside");
  const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is passed in the Authorization header
  console.log("Token", token);

  if (!token) {
    return res
      .status(401)
      .json({ success: 0, message: "Authentication required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET should be stored in your .env file
    req.user = decoded; // Store decoded user data in req.user
    next();
  } catch (error) {
    res.status(401).json({ success: 0, message: "Invalid or expired token." });
  }
};
