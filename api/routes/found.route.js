import express from "express";
import { createFoundPost, deleteFoundPost, getAllFoundPost, getFoundPostById, getFoundPostByUserId, updateFoundPostById  } from "../controllers/found.controller.js";
import upload from "../utils/multer.js";
import { verifyAdmin, verifyUser } from "../utils/verifyUser.js";


const router = express.Router();

router.get("/",verifyAdmin, getAllFoundPost);
router.post("/create", upload.single('image'),verifyUser, createFoundPost);
router.delete("/delete/:id", deleteFoundPost);
router.get("/:id", getFoundPostByUserId);
router.get("/view/:id", getFoundPostById);
router.put("/update/:id",upload.single('image'), updateFoundPostById);


export default router;
