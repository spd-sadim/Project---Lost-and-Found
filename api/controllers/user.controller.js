import pool from "../db.js";
import { errorHandler } from "../utils/error.js";

export const getUsers = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE NOT user_id = $1", [req.query.id]);
    const santizedUsers = santizedUserData(result.rows);
    res.json(santizedUsers);
  } catch (err) {
    next(err);
  }
};

//function to remove pwd from array of users;
function santizedUserData(users) {
  return users.map((user) => {
    const { user_password, ...santizedUser } = user;
    return santizedUser;
  });
}

//Retrieve user based on user_id
export const getUserById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      req.params.id,
    ]);
    const { user_password, ...user } = result.rows[0];
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};



//delete user
export const deleteUser = async (req,res, next)=>{
  try {
    const result = pool.query('DELETE FROM users WHERE user_id = $1', [req.params.id]);
    res.status(200).json({message: "User deleted succesfully"});
  } catch(err){
    next(err);
  }
}

//update user
export const updateUser = async (req, res, next) => {
  const { id, user_firstname, user_lastname, user_phonenumber, user_email } =
    req.body;
  const query = `
        UPDATE users
        SET user_firstname = $1,
            user_lastname = $2,
            user_phonenumber = $3,
            user_email = $4
        WHERE user_id = $5
        RETURNING *;
      `;
  const values = [
    user_firstname,
    user_lastname,
    user_phonenumber,
    user_email,
    id,
  ];
  try {
    const response = await pool.query(query, values);
    if (response.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const { user_password, ...userData } = response.rows[0];
    res
      .status(200)
      .json({ message: "Profile updated succesfully", user: userData });
  } catch (err) {
    next(errorHandler(401, err));
  }
};

//Update user by admin
export const updateUserByAdmin = async (req, res, next) => {
  const id = req.params.id;
  const { user_firstname, user_lastname, user_phonenumber, user_email, role } =
    req.body;
  const query = `
        UPDATE users
        SET user_firstname = $1,
            user_lastname = $2,
            user_phonenumber = $3,
            user_email = $4,
            role = $5
        WHERE user_id = $6
        RETURNING *;
      `;
  const values = [
    user_firstname,
    user_lastname,
    user_phonenumber,
    user_email,
    role,
    id,
  ];
  try {
    const response = await pool.query(query, values);
    if (response.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const { user_password, ...userData } = response.rows[0];
    res
      .status(200)
      .json({ message: "Profile updated succesfully", user: userData });
  } catch (err) {
    next(errorHandler(401, err));
  }
};
