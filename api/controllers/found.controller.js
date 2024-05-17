import pool from "../db.js";


export const createPost = (tableName, values,)=>{
    const sql = `INSERT INTO ${tableName}(item_name, location, date, additional_info, category_id, image, user_id ) VALUES ($1, $2, $3, $4, $5, $6, $7)`
   return pool.query(sql, values)
}


export const createFoundPost = async(req, res)=>{
   const {name, location, date, additional_info, category , user_id} = req.body;
   const image = req.file;
   const category_id = parseInt(category, 10);
   try {
        // const sql = 'INSERT INTO found_posts(item_name, location, date, additional_info, category_id, image, user_id ) VALUES ($1, $2, $3, $4, $5, $6, $7)'
        const values = [name, location, date, additional_info, category_id, image.filename, user_id]
       const result =  await createPost('found_posts', values);
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
        next(500, 'Error executing code')
    }
}

export const getFoundPostById = async (req, res, next) => {
    try {
        const foundPost = await pool.query("SELECT * FROM found_posts WHERE id = $1", [req.params.id]);
        res.status(200).json(foundPost.rows); 
    } catch (err) {
        next(500, 'Error executing code')
    }
}

export const getAllFoundPost = async(req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM found_posts');
        res.status(200).json(result.rows);
    } catch (err){
        next(500, 'Error executing code')
    }
}