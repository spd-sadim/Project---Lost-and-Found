import express from 'express';
import { getAllPost, getPosts } from '../controllers/post.controller.js';


const router = express.Router();

router.get("/", getPosts);
router.get('/all', getAllPost);


export default router;