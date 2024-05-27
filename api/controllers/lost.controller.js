import { createPost, deletePost } from "./found.controller.js";
import pool from "../db.js";
import { errorHandler } from "../utils/error.js";

export const createLostPost = async (req, res, next) => {
  const { name, location, date, additional_info, category, user_id } = req.body;
  const image = req.file;
  const category_id = parseInt(category, 10);
  try {
    // const sql = 'INSERT INTO found_posts(item_name, location, date, additional_info, category_id, image, user_id ) VALUES ($1, $2, $3, $4, $5, $6, $7)'
    const values = [
      name,
      location,
      date,
      additional_info,
      category_id,
      image.filename,
      user_id,
    ];
    const result = await createPost("lost_posts", values);
    res.status(201).send("Create post succesfully");
  } catch (err) {
    next(err);
  }
};

export const getLostPostById = async (req, res, next) => {
  try {
    const lostPost = await pool.query(
      "SELECT * FROM lost_posts WHERE id = $1",
      [req.params.id]
    );
    res.status(200).json(lostPost.rows);
  } catch (err) {
    next(500, "Error executing code");
  }
};

export const getLostPostByUserId = async (req, res, next) => {
  try {
    const lostPosts = await pool.query(
      "SELECT * FROM lost_posts WHERE user_id = $1",
      [req.params.id]
    );
    res.status(200).json(lostPosts.rows);
  } catch (err) {
    next(500, "Error executing code");
  }
};

export const updateLostPostById = async (req, res, next) => {
  const {
    item_name,
    location,
    date,
    additional_info,
    category_id,
    image = null,
  } = req.body;
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
    UPDATE lost_posts
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
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (err) {
    console.error("Error executing code", err);
    next(err);
  }
};

export const getLostPost = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM lost_posts");
    res.status(200).json(result.rows);
  } catch (err) {
    next(500, "Error executing code");
  }
};

export const deleteLostPost = async (req, res) => {
  try {
    await deletePost("lost_posts", [req.params.id]);
    res.status(200).json({ message: "Deleted item succesfully" });
  } catch (err) {
    next(errorHandler(500, "Error executing code", err));
  }
};
