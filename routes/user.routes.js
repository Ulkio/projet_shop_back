import express from "express";
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/withAuth.js";

const router = express.Router();

//GET
router.get("/", getUsers);
router.get("/:id", getUserById);

//ACTIONS
router.patch("/:id", verifyJWT, updateUser);
router.delete("/:id", deleteUser);

export default router;
