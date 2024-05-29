import express from "express";
import {
  deleteInquiryById,
  getInquiry,
  getInquiryById,
  postInquiry,
} from "../controllers/inquiry.controller.js";

const router = express.Router();

router.post("/:id", postInquiry);
router.get("/", getInquiry);
router.get("/:id", getInquiryById);
router.delete("/:id", deleteInquiryById);

export default router;
