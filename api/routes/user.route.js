import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserByAdmin,
} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id",verifyUser, deleteUser);
router.put("/profile", verifyUser, updateUser);
router.put("/:id",verifyUser, updateUserByAdmin)

export default router;
