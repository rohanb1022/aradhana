import express from "express";
import {
  addComment,
  getCommentsByBlogId,
  likePost
} from "../controller/comment.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/comments/:id -> add comment to a specific blog
router.post("/:id", verifyToken, addComment);

// GET /api/comments/:id -> get all comments for a specific blog
router.get("/:id", getCommentsByBlogId);

// // DELETE /api/comments/:id -> delete a specific comment
// router.delete("/:commentId", verifyToken, deleteComment);

// PUT /api/comments/:id -> like a specific blog
router.put("/:id" , verifyToken , likePost)

export default router;
