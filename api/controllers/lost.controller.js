import { createPost, deletePost } from "./found.controller.js";
import pool from "../db.js";
import { errorHandler } from "../utils/error.js";

export const createLostPost = async(req, res)=>{
    const {name, location, date, additional_info, category , user_id} = req.body;
    const image = req.file;
    const category_id = parseInt(category, 10);
    try {
         // const sql = 'INSERT INTO found_posts(item_name, location, date, additional_info, category_id, image, user_id ) VALUES ($1, $2, $3, $4, $5, $6, $7)'
         const values = [name, location, date, additional_info, category_id, image.filename, user_id]
        const result =  await createPost('lost_posts', values);
         res.status(201).send('Create post succesfully');
    } catch (err){
     res.status(500).json(err);
    }
 }

 export const getLostPostById = async (req, res, next) => {
    try {
        const lostPost = await pool.query("SELECT * FROM lost_posts WHERE id = $1", [req.params.id]);
        res.status(200).json(lostPost.rows); 
    } catch (err) {
        next(500, 'Error executing code')
    }
}

 export const getLostPostByUserId = async (req, res, next) => {
    try {
        const lostPosts = await pool.query("SELECT * FROM lost_posts WHERE user_id = $1", [req.params.id]);
        res.status(200).json(lostPosts.rows); 
    } catch (err) {
        next(500, 'Error executing code')
    }
}

 export const getLostPost = async(req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM lost_posts');
        res.status(200).json(result.rows);
    } catch (err){
        next(500, 'Error executing code')
    }
}


export const deleteLostPost = async (req, res)=>{
    try {
        await deletePost('lost_posts', [req.params.id]);
        res.status(200).json({message: "Deleted item succesfully"});
    } catch (err){
        next(errorHandler(500, 'Error executing code', err))
    }
}