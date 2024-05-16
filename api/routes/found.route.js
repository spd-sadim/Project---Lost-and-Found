import express from "express";
import { createFoundPost, getFoundPost } from "../controllers/found.controller.js";


const router = express.Router();

router.get("/", getFoundPost);
router.post("/create", createFoundPost);

export default router;
