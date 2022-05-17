import express from "express";
import { getProducts, getProductById, getProductsByCategory, postProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { verifyJWT } from "../middlewares/withAuth.js";

const router = express.Router();

//GET
router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/category/:id", getProductsByCategory);

//ACTIONS
router.post("/", verifyJWT, isAdmin, postProduct);
router.patch("/:id", verifyJWT, isAdmin, updateProduct);
router.delete("/:id", verifyJWT, isAdmin, deleteProduct);

export default router;
