import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import blogRoutes from "./routes/blog.route.js";
import userRoutes from "./routes/user.route.js";
import commentRoutes from "./routes/comment.route.js";
import aiRoutes from "./routes/apiAi.route.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Required for Render to trust proxy headers (for secure cookies)
app.set("trust proxy", 1);

// Basic CORS setup (not needed if frontend and backend on same domain, but safe fallback)
app.use(cors({
  origin: true,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  message: {
    status: 429,
    error: "Too many requests. Please try again after a minute.",
  },
});
app.use(limiter);

// Body parser and cookies
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Routes
 app.use("/api/auth", authRoutes);
 app.use("/api/blogs", blogRoutes);
 app.use("/api/user", userRoutes);
 app.use("/api/comments", commentRoutes);
 app.use("/api/ai", aiRoutes);


//  Serve React Frontend

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

 //Serve static files from frontend build
app.use(express.static(path.resolve(__dirname, "client", "dist")));

// Avoid matching /api or any backend paths
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});


// Error Handler

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.stack || err.message);
  res.status(500).json({ message: "Internal server error" });
});


// Start Server

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB();
});
