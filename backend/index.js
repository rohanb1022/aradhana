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

const allowedOrigins = [
  "http://localhost:5173",        // for local dev
  "https://your-frontend-url.com" // for production (replace with real URL)
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per minute
  message: {
    status: 429,
    error: "Too many requests. Please try again after a minute.",
  },
});

app.use("/api/ai", limiter); // apply limiter only to AI routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/ai", aiRoutes);


app.get("/", (req, res) => {
  res.send("APP is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  connectDB();
});
