import express from "express";
import { getUsers, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.put("/profile", updateUser)

export default router;
