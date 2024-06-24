import pool from "../db.js";
import { errorHandler } from "../utils/error.js";


export const createPost = (tableName, values,)=>{
    const sql = `INSERT INTO ${tableName}(item_name, location, date, additional_info, category_id, image, user_id ) VALUES ($1, $2, $3, $4, $5, $6, $7)`
   return pool.query(sql, values)
}

export const deletePost = (tableName, id)=>{
    const sql = `DELETE FROM ${tableName} WHERE id = ${id}`;
    return pool.query(sql);
}

export const createFoundPost = async(req, res)=>{
   const {item_name, location, date, additional_info, category , user_id} = req.body;
   console.log(req.body)
   const image = req.file;
   const category_id = parseInt(category, 10);
   try {
        // const sql = 'INSERT INTO found_posts(item_name, location, date, additional_info, category_id, image, user_id ) VALUES ($1, $2, $3, $4, $5, $6, $7)'
        const values = [item_name, location, date, additional_info, category_id, image.filename, user_id]
        console.log(values)
       const result =  await createPost('found_posts', values);
       console.log(result)
        res.status(201).send('Create post succesfully');
   } catch (err){
    res.status(500).json(err);
   }
}

export const getFoundPostByUserId = async (req, res, next) => {
    try {
        const foundPost = await pool.query("SELECT * FROM found_posts WHERE user_id = $1", [req.params.id]);
        res.status(200).json(foundPost.rows); 
    } catch (err) {
        next(errorHandler(500, 'Error executing code', err))
    }
}

export const getFoundPostById = async (req, res, next) => {
    try {
        const foundPost = await pool.query("SELECT * FROM found_posts WHERE id = $1", [req.params.id]);
        res.status(200).json(foundPost.rows); 
    } catch (err) {
        next(errorHandler(500, 'Error executing code', err))
    }
}

export const getAllFoundPost = async(req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM found_posts');
        res.status(200).json(result.rows);
    } catch (err){
        next(errorHandler(500, 'Error executing code', err))
    }
}


export const updateFoundPostById = async (req, res, next) => {
    const {item_name, location, date, additional_info, category_id, image = null} = req.body;
    const newImage = req.file ? req.file.filename : image;
    const updatedData = {
      item_name,
      location,
      date,
      additional_info,
      category_id,
      image: newImage,
    };
    const { id } = req.params;
    const query = `
      UPDATE found_posts
      SET
        item_name = $1,
        location = $2,
        date = $3,
        additional_info = $4,
        category_id = $5,
        image = $6
      WHERE id = $7
      RETURNING *;
    `;
    const values = [
      updatedData.item_name,
      updatedData.location,
      updatedData.date,
      updatedData.additional_info,
      updatedData.category_id,
      updatedData.image,
      id,
    ];
    try {
      const result = await pool.query(query, values);
      const updatedPost = result.rows[0];
      res.status(200).json({
        message: 'Post updated successfully',
        data: updatedPost,
      });
    } catch (err) {
      console.error('Error executing code', err);
      next(err);
    }
  
  };


export const deleteFoundPost = async (req, res)=>{
    try{
        console.log(req.params.id);
        deletePost('found_posts', req.params.id);
        res.status(200).json({message: "Deleted item succesfully"});
    } catch (err){
       ;
    }
}