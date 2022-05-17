import express from "express";
import { getCategories, updateCategory, postCategory, deleteCategory } from "../controllers/category.controller.js";
import { verifyJWT } from "../middlewares/withAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router = express.Router();

//GET
router.get("/", getCategories);

//ACTIONS
router.post("/", verifyJWT, isAdmin, postCategory);
router.patch("/:id", verifyJWT, isAdmin, updateCategory);
router.delete("/:id", verifyJWT, isAdmin, deleteCategory);

export default router;
