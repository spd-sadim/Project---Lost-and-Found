import pool from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    const santizedUsers = santizedUserData(result.rows);
    res.json(santizedUsers);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//function to remove pwd from array of users;
function santizedUserData(users) {
  return users.map((user) => {
    const { user_password, ...santizedUser } = user;
    return santizedUser;
  });
}

export const updateUser = async (req, res) => {
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
  //       const  number = parseInt(user_phonenumber, 10);
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
    console.log(err);
  }
};
