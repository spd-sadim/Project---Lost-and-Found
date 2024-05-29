import pool from "../db.js";
import { errorHandler } from "../utils/error.js";

//post inquiry
export const postInquiry = async (req, res, next) => {
  const { fullname, email, number, message } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO inquirylist(fullname, contact , email, message) VALUES($1, $2, $3, $4)",
      [fullname, number, email, message]
    );
    res.status(200).json({ message: "Inquiry submitted successfully" });
  } catch (err) {
    next(err);
  }
};

//get all inquiry
export const getInquiry = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM inquirylist");
    if (result.rows.length === 0)
      return next(errorHandler(404, "No inquiry message"));
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
};

//get inquriy by id
export const getInquiryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM inquirylist WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0)
      return next(errorHandler(404, "No inquiry message"));
    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const deleteInquiryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM inquirylist WHERE id = $1", [
      id,
    ]);
    res.status(200).json({ message: "Inquiry message deleted successfully" });
  } catch (err) {
    next(err);
  }
};
