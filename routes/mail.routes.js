import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

//GET
router.get("/:uuid", async (req, res, next) => {
  const queryFindUser = `SELECT * FROM user WHERE validation_link = ?`;
  const uuid = req.params.uuid;
  try {
    const result = await User.findUser(queryFindUser, uuid);
    if (!result.length) {
      return res.json({
        result: `No user found`,
      });
    }
    const query = `UPDATE user
    SET isValidated = 'yes'
    WHERE validation_link = ?`;
    try {
      const result = await User.validateUser(query, uuid);
      return res.json({
        result: "user validated",
      });
    } catch (error) {
      return res.json({
        error: error.message,
      });
    }
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
});

export default router;
