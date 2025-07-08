import express from "express";
import {  getAllBlogs, getBlogById, createBlog  , deleteBlog } from "../controller/blog.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET /api/blogs -> get all blogs
router.get("/getBlogs", getAllBlogs);

// GET /api/blogs/:id -> get a specific blog by ID
router.get("/:id", getBlogById);

// POST /api/blogs -> create a new blog
router.post("/create", verifyToken , createBlog);

// Delete /api/blogs/deleteBlog/:id -> delete a specific blog by ID
router.delete("/delete/:id", verifyToken , deleteBlog);

export default router;
