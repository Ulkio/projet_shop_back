import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import mail from "../lib/mailing.js";
import { v4 as uuidv4 } from "uuid";
import { saltrounds } from "../config/index.js";

export const login = async (req, res, next) => {
  const data = {
    user_email: req.body.user_email,
    user_password: req.body.user_password,
  };
  const query = `SELECT * FROM user WHERE user_email = ?`;
  try {
    const user = await User.findUser(query, data.user_email);
    if (!user.length) {
      return res.json({
        result: "incorrect email",
      });
    } else {
      const validPassword = await bcrypt.compare(data.user_password, user[0].user_password);
      if (validPassword) {
        /* -------------------------------------------------------------------------- */
        /*                                     JWT                                    */
        /* -------------------------------------------------------------------------- */
        const role = user[0].user_role;
        const id = user[0].id;
        const token = jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "30m",
        });
        if (role === "admin") {
          return res.json({
            auth: true,
            admin: true,
            token: token,
            user: user[0],
          });
        }
        return res.json({
          auth: true,
          admin: false,
          token: token,
          user: user[0],
        });
        /* -------------------------------------------------------------------------- */
        /*                                     JWT                                    */
        /* -------------------------------------------------------------------------- */
      } else {
        return res.json({
          auth: false,
          token: "",
          result: "incorrect password",
        });
      }
    }
  } catch (error) {
    return res.json({
      result: "network error",
    });
  }
};

export const logout = async (req, res, next) => {
  return res.json({
    auth: false,
    token: "",
  });
};

export const register = async (req, res, next) => {
  const findEmail = `SELECT * FROM user WHERE user_email = ?`;
  try {
    const result = await User.findUser(findEmail, req.body.user_email);
    if (result.length > 0) {
      return res.json({
        result: "user already registered",
      });
    } else {
      const data = {};
      for (const key in req.body) {
        if (Object.hasOwnProperty.call(req.body, key)) {
          data[key] = req.body[key];
        }
      }
      const uuid = uuidv4();

      data.validation_link = uuid;
      data.user_password = await bcrypt.hash(req.body.user_password, saltrounds);
      const query = `INSERT INTO user
        (user_name,user_password,user_email,user_role,isValidated,validation_link)
        VALUES
        (?,?,?,'user','no',?)`;

      try {
        const result = await User.save(query, data);
        const link = `http://localhost:9000/validate-email/${uuid}`;
        mail(data.user_email, `Thanks for registering. Please validate your email`, `Click on the link`, `<a href="${link}">Validate your email</a>`);
        return res.json({
          result: result,
        });
      } catch (error) {
        return res.json({
          error: error.message,
        });
      }
    }
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
