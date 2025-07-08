import express from "express";
import {
  signup,
  signin,
  logout,
  authCheck,
} from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", signin);
router.post("/logout", verifyToken, logout);
router.get("/check-auth", verifyToken, authCheck);

export default router;
