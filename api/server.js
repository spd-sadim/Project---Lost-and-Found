import express from "express";
import userRoutes from "./routes/user.route.js";
import foundRoutes from "./routes/found.route.js";
import authRoutes from "./routes/auth.route.js";
import inquiryRoutes from "./routes/inquiry.route.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/found", foundRoutes)

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
