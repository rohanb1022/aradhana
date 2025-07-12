import express from "express";
import { generateBlogSuggestions } from "../controller/apiAi.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/suggest", verifyToken, generateBlogSuggestions);

export default router;
