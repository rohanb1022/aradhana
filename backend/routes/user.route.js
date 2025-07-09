import express from "express";
import {  getProfile, addDetails } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET /api/user/profile -> get user profile
router.get("/profile", verifyToken, getProfile);

// POST /api/user/addDetails -> add user details
router.post("/addDetails", verifyToken, addDetails);


export default router;