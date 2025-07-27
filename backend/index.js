import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import blogRoutes from "./routes/blog.route.js";
import userRoutes from "./routes/user.route.js";
import commentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import aiRoutes from "./routes/apiAi.route.js";
import rateLimit from "express-rate-limit";
const app = express();

app.set("trust proxy", 1); //  Required for Render

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));


// Define it early before using it
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  message: {
    status: 429,
    error: "Too many requests. Please try again after a minute.",
  },
});


app.use(limiter); 

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// your routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/ai", aiRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(" SERVER ERROR:", err.stack || err.message);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});