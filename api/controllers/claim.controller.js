import pool from "../db.js";
import { errorHandler } from "../utils/error.js";

export const claimPost = async (req, res) => {
  const { message, postId, postType, userId, userName } = req.body;
  const image = req.file;

  try {
    const result = await pool.query(
      "INSERT INTO claims (post_id, post_type, message, image, user_id, user_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [postId, postType, message, image.filename, userId, userName]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating claim:", error);
    res.status(500).json({ error: "Failed to create claim" });
  }
};

export const getUserClaims = async (req, res, next) => {
    const userId = req.user.id.user_id; // Corrected the path to user ID
    // console.log(req.user)
  
    try {
      const query = 'SELECT * FROM claims WHERE user_id = $1 ';
      console.log('Executing query:', query, 'with userId:', userId);
      
      const claims = await pool.query(query, [userId]);

      if(claims.rows.length  === 0) return next(errorHandler(404, 'No claims recorded'));
      res.json(claims.rows);
    } catch (error) {
      console.error('Error fetching user claims:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  // export const getClaimedPost = async( req, res)=>{
  //   const userId = req.user.id.user_id;
  //   console.log(userId)
  //   try {
  //       const result = await pool.query(`
  //           SELECT c.* FROM claims c
  //           JOIN lost_posts lp ON c.post_id = lp.id AND c.post_type = 'lost' AND lp.user_id = $1
  //           UNION
  //           SELECT c.* FROM claims c
  //           JOIN found_posts fp ON c.post_id = fp.id AND c.post_type = 'found' AND fp.user_id = $1;
  //       `, [userId]);
  //       if(result.rows.length  === 0) return next(errorHandler(404, 'No claims recorded'));
  //       res.json(result.rows);
  //   } catch (err) {
  //       console.error(err.message);
  //       res.status(500).send('Server error');
  //   }
  // }


  export const getClaimedPost = async (req, res, next) => {
    const userId = req.user.id.user_id;
    console.log(userId);
    try {
        const result = await pool.query(`
            SELECT c.*, 
                   lp.id AS post_id, 
                   lp.item_name, 
                   lp.location,
                   lp.image AS item_image,
                   lp.category_id,
                   lp.additional_info, 
                   'lost' AS post_type 
            FROM claims c
            JOIN lost_posts lp ON c.post_id = lp.id 
            WHERE c.post_type = 'lost' AND lp.user_id = $1
            UNION
            SELECT c.*, 
                   fp.id AS post_id, 
                   fp.item_name, 
                   fp.location,
                   fp.image AS item_image,
                   fp.category_id,
                   fp.additional_info, 
                   'found' AS post_type 
            FROM claims c
            JOIN found_posts fp ON c.post_id = fp.id 
            WHERE c.post_type = 'found' AND fp.user_id = $1;
        `, [userId]);
        
        if (result.rows.length === 0) return next(errorHandler(404, 'No claims recorded'));
        
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}


