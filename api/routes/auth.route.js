import express from "express";
import { signIn, signUp, signout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get('/signout', signout );

export default router;
