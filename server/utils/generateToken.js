import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (username, res) => {
  //   console.log("Inside token generator");
  const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });

  //   console.log(token);

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    // secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
