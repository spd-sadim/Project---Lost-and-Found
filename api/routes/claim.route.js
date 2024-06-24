import express from "express";
import { claimPost, getClaimedPost, getUserClaims } from "../controllers/claim.controller.js";
import { verifyUser } from "../utils/verifyUser.js";
import upload from "../utils/multer.js";



const router = express.Router();


router.get("/", verifyUser, getUserClaims);
router.get('/posted-claim',verifyUser, getClaimedPost )
router.post("/", upload.single('image'), verifyUser, claimPost  );

export default router;