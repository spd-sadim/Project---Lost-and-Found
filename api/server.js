import express from "express";
import userRoutes from "./routes/user.route.js";
import foundRoutes from "./routes/found.route.js";
import lostRoutes from "./routes/lost.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import inquiryRoutes from "./routes/inquiry.route.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

// app.use(express.static('Public'));
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('public/images'));
app.use(express.json());
app.use(cookieParser());
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/found", foundRoutes)
app.use("/api/lost", lostRoutes)
app.use("/api/posts", postRoutes)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    stack: err.stack,
  });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
