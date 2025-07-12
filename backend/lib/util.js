import jwt from "jsonwebtoken";

const generateWebToken = (userId, res) => {
  const token = jwt.sign({userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("blogging-jwt", token, {
  httpOnly: true,
  sameSite: "none",  // because frontend is on different origin (vercel)
  secure: true,      // must be true for HTTPS
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

  return token; 
};

export default generateWebToken;
