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

// export const getUserClaims = async (req, res, next) => {
//     const userId = req.user.id.user_id; // Corrected the path to user ID
//     // console.log(req.user)

//     try {
//       const query = `
//             SELECT c.*,
//                    lp.id AS post_id,
//                    lp.item_name,
//                    lp.location,
//                    lp.image AS item_image,
//                    lp.category_id,
//                    lp.additional_info,
//                    'lost' AS post_type
//             FROM claims c
//             JOIN lost_posts lp ON c.post_id = lp.id
//             WHERE c.post_type = 'lost' AND c.user_id = $1
//             UNION
//             SELECT c.*,
//                    fp.id AS post_id,
//                    fp.item_name,
//                    fp.location,
//                    fp.image AS item_image,
//                    fp.category_id,
//                    fp.additional_info,
//                    'found' AS post_type
//             FROM claims c
//             JOIN found_posts fp ON c.post_id = fp.id
//             WHERE c.post_type = 'found' AND c.user_id = $1;
//         `;
//       console.log('Executing query:', query, 'with userId:', userId);

//       const claims = await pool.query(query, [userId]);

//       if(claims.rows.length  === 0) return next(errorHandler(404, 'No claims recorded'));
//       res.json(claims.rows);
//     } catch (error) {
//       console.error('Error fetching user claims:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };

export const getUserClaims = async (req, res, next) => {
  const userId = req.user.id.user_id;

  try {
    const query = `
      SELECT c.*, 
             lp.id AS post_id, 
             lp.item_name, 
             lp.location,
             lp.image AS item_image,
             lp.category_id,
             lp.additional_info, 
             'lost' AS post_type,
              u.user_phonenumber,
             u.user_email
      FROM claims c
      JOIN lost_posts lp ON c.post_id = lp.id 
      JOIN users u ON lp.user_id = u.user_id
      WHERE c.post_type = 'lost' AND c.user_id = $1
      UNION
      SELECT c.*, 
             fp.id AS post_id, 
             fp.item_name, 
             fp.location,
             fp.image AS item_image,
             fp.category_id,
             fp.additional_info, 
             'found' AS post_type,
             u.user_phonenumber,
             u.user_email
      FROM claims c
      JOIN found_posts fp ON c.post_id = fp.id 
      JOIN users u ON fp.user_id = u.user_id
      WHERE c.post_type = 'found' AND c.user_id = $1;
    `;

    const claims = await pool.query(query, [userId]);

    if (claims.rows.length === 0)
      return next(errorHandler(404, "No claims recorded"));
    res.json(claims.rows);
  } catch (error) {
    console.error("Error fetching user claims:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getClaimedPost = async (req, res, next) => {
  const userId = req.user.id.user_id;
  console.log(userId);
  try {
    const result = await pool.query(
      `
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
        `,
      [userId]
    );

    if (result.rows.length === 0)
      return next(errorHandler(404, "No claims recorded"));

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Approve claim
export const approveClaim = async (req, res) => {
  const claimId = req.params.id;

  try {
    const result = await pool.query(
      "UPDATE claims SET status = 'approved' WHERE id = $1 RETURNING *",
      [claimId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Claim not found" });
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error approving claim:", error);
    res.status(500).json({ error: "Failed to approve claim" });
  }
};


// get all claims
export const getAllUserClaims = async (req, res, next) => {
  try {
    const query = `
      SELECT c.*, 
             lp.id AS post_id, 
             lp.item_name, 
             lp.location,
             lp.image AS item_image,
             lp.category_id,
             lp.additional_info, 
             'lost' AS post_type,
             u.user_phonenumber,
             u.user_email
      FROM claims c
      LEFT JOIN lost_posts lp ON c.post_id = lp.id 
      LEFT JOIN users u ON lp.user_id = u.user_id
      WHERE c.post_type = 'lost'
      UNION
      SELECT c.*, 
             fp.id AS post_id, 
             fp.item_name, 
             fp.location,
             fp.image AS item_image,
             fp.category_id,
             fp.additional_info, 
             'found' AS post_type,
             u.user_phonenumber,
             u.user_email
      FROM claims c
      LEFT JOIN found_posts fp ON c.post_id = fp.id 
      LEFT JOIN users u ON fp.user_id = u.user_id
      WHERE c.post_type = 'found';
    `;

    const claims = await pool.query(query);

    if (claims.rows.length === 0)
      return next(errorHandler(404, "No claims recorded"));

    res.json(claims.rows);
  } catch (error) {
    console.error("Error fetching all user claims:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Decline claim
export const declineClaim = async (req, res) => {
  const claimId = req.params.id;

  try {
    const result = await pool.query(
      "UPDATE claims SET status = 'Rejected' WHERE id = $1 RETURNING *",
      [claimId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Claim not found" });
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error declining claim:", error);
    res.status(500).json({ error: "Failed to decline claim" });
  }
};
