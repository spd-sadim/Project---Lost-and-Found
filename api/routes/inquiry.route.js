import express from "express";
import { getInquiry, getInquiryById, postInquiry } from "../controllers/inquiry.controller.js";

const router = express.Router();

router.post("/:id", postInquiry);
router.get("/", getInquiry);
router.get("/:id", getInquiryById);

export default router;
