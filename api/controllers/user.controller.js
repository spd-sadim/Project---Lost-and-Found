import pool from "../db.js"

export const getUsers = async(req, res)=>{
   try{
    const result = await pool.query("SELECT * FROM users");
    res.json({message: result});
   } catch (err) {
            res.status(500).json({error: err});
       }
        // res.json({message: "hello"});
}