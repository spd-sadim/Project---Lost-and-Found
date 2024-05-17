import express from "express";

import upload from "../utils/multer.js";
import { createLostPost, getLostPost, getLostPostByUserId } from "../controllers/lost.controller.js";


const router = express.Router();

router.get("/", getLostPost);
router.get("/:id", getLostPostByUserId);
router.post("/create", upload.single('image'), createLostPost);

export default router;
