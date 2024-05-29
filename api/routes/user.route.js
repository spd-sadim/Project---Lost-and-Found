import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserByAdmin,
} from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id",verifyAdmin, getUserById);
router.delete("/:id",verifyAdmin, deleteUser);
router.put("/profile", verifyUser, updateUser);
router.put("/:id", verifyAdmin, updateUserByAdmin)

export default router;
