import express from "express";
import { approveClaim, claimPost, declineClaim, getAllUserClaims, getClaimedPost, getUserClaims } from "../controllers/claim.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyUser.js";
import upload from "../utils/multer.js";



const router = express.Router();


router.get("/", verifyUser, getUserClaims);
router.get("/all", verifyAdmin, getAllUserClaims);
router.get('/posted-claim',verifyUser, getClaimedPost )
router.post("/", upload.single('image'), verifyUser, claimPost  );
router.put('/approve/:id', approveClaim);
router.put('/decline/:id', declineClaim);

export default router;