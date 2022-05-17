import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { saltrounds } from "../config/index.js";

export const getUsers = async (req, res, next) => {
  const query = `SELECT * FROM user`;
  try {
    const results = await User.getUsers(query);
    return res.json({
      result: results,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  const query = `SELECT * FROM user WHERE id = ?`;
  try {
    const results = await User.getUserById(query, id);
    return res.json({
      result: results[0],
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export const updateUser = async (req, res, next) => {
  const data = {};
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      data[key] = req.body[key];
    }
  }
  data.id = req.params.id;
  data.user_password = await bcrypt.hash(req.body.user_password, saltrounds);

  const query = `UPDATE user
    SET user_name = ?, user_password = ?, user_email = ?, user_role = 'user', isValidated = 'yes'
    WHERE id = ?`;

  try {
    const result = await User.save(query, data);
    return res.json({
      result: result,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const query = `DELETE FROM user WHERE id = ?`;

  try {
    const result = await User.delete(query, id);
    return res.json({
      result: result,
      message: `Deleted user ${id}`,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
