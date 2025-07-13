// middleware/verifyToken.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// export const verifyToken = async (req, res, next) => {
//   const token = req.cookies["blogging-jwt"]; // this exact key

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

export const verifyToken = async (req, res, next) => {
  const token = req.cookies["blogging-jwt"];
  console.log(" Incoming token:", token);

  if (!token) {
    console.log(" No token received");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      console.log(" No user found with ID:", decoded.userId);
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(" Token verification error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
