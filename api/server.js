import express from "express";
import userRoutes from "./routes/user.route.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
