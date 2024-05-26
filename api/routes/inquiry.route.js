import express from "express";
import { getInquiry, postInquiry } from "../controllers/inquiry.controller.js";

const router = express.Router();

router.post("/:id", postInquiry);
router.get("/", getInquiry);

export default router;
