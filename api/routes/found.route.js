import express from "express";
import { createFoundPost, deleteFoundPost, getAllFoundPost, getFoundPostById, getFoundPostByUserId  } from "../controllers/found.controller.js";
import upload from "../utils/multer.js";


const router = express.Router();

router.get("/", getAllFoundPost);
router.post("/create", upload.single('image'), createFoundPost);
router.delete("/delete/:id", deleteFoundPost);
router.get("/:id", getFoundPostByUserId);
router.get("/view/:id", getFoundPostById);


export default router;
