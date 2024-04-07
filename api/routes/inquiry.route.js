import express from "express";
import { getInquiry, postInquiry } from "../controllers/inquiry.controller.js";

const router = express.Router();

router.post("/post", postInquiry);
router.get("/get", getInquiry);

export default router;
