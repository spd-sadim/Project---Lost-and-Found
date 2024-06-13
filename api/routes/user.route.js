import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserByAdmin,
  changePassword,
} from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", verifyUser, verifyAdmin, getUserById);
router.delete("/:id", verifyAdmin, deleteUser);
router.put("/profile", verifyUser, updateUser);
router.put("/:id", verifyAdmin, updateUserByAdmin);
router.post("/change-password",verifyUser, changePassword);

export default router;
