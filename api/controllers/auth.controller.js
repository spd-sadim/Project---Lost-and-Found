import pool from "../db.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const getUserByEmail = async (email) => {
  const result = await pool.query("SELECT * from users where user_email = $1", [
    email,
  ]);
  return result;
};

//sign up  user
export const signUp = async (req, res, next) => {
  const { firstname, lastname, phonenumber, email, password } = req.body;
  try {
    const exisingUser = await getUserByEmail(email);
    if (exisingUser.rows.length > 0) {
      return res.status(401).json("User already exist with email!");
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

// sign in user
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await getUserByEmail(email);
    const existingUser = result.rows;

    if (existingUser.length === 0)
      return next(errorHandler(404, "User not found!"));

    const isValidPassword = bcrypt.compareSync(
      password,
      existingUser[0].user_password
    );
    if (!isValidPassword) return next(errorHandler(401, "Wrong Credentials !"));

    const token = jwt.sign({ id: existingUser[0] }, process.env.JWT_SECRET);

    const { user_password, ...rest } = existingUser[0];
    const expiryDate = new Date(Date.now() + 3600000);

    res
      .cookie("access-token", token, { httpOnly: true, expires: expiryDate }) //httpOnly: true, prevents third party app to modify cookie
      .status(200)
      .status(200)
      .json(rest);
  } catch (err) {
    res.json(err.message);
  }
};
