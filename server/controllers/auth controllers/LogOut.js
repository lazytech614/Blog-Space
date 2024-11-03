export const logOut = (req, res) => {
  try {
    // Clear the JWT cookie by using res.clearCookie
    res.clearCookie("jwt", {
      httpOnly: true, // Ensure this matches how you set the cookie initially
      // secure: process.env.NODE_ENV === "production", // Ensure this matches your environment
      sameSite: "Strict", // SameSite policy (optional, based on your original cookie settings)
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
