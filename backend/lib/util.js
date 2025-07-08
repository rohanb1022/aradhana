import jwt from "jsonwebtoken";

const generateWebToken = (userId, res) => {
  const token = jwt.sign({userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("blogging-jwt", token, {
  httpOnly: true,
  sameSite: "lax",   // or "none" if you're using HTTPS + cross-origin
  secure: false,     // true if you're on HTTPS
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});


  return token; 
};

export default generateWebToken;
