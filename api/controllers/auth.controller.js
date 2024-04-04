import pool from "../db.js";
import bcrypt from "bcryptjs";

//sign up  user
export const signUp = async (req, res, next) => {
  const { firstname, lastname, phonenumber, email, password } = req.body;
  try {
    const getUser = await pool.query(
      "SELECT * from users where user_email = $1",
      [email]
    );
    if (getUser.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await pool.query(
      "INSERT INTO users (user_firstname, user_lastname, user_phonenumber, user_email, user_password) VALUES ($1, $2, $3, $4, $5) returning *",
      [firstname, lastname, phonenumber, email, hashedPassword]
    );

    res.status(201).json({ message: "User created succesfully!" });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
