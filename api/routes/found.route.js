import express from "express";


const router = express.Router();

router.get("/", getFoundPost);

export default router;
