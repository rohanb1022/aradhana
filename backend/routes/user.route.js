import express from "express";
import { likePost, getProfile, addDetails } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/user/like/:blogid -> like a blog post
router.put("/like/:id", verifyToken, likePost);

// GET /api/user/profile -> get user profile
router.get("/profile", verifyToken, getProfile);

// POST /api/user/addDetails -> add user details
router.post("/addDetails", verifyToken, addDetails);


export default router;