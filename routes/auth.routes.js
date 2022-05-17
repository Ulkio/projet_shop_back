import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/withAuth.js";
const router = express.Router();

//GET
router.post("/login", login);
router.get("/logout", verifyJWT, logout);
router.post("/register", register);

export default router;
