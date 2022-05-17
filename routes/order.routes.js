import express from "express";
import { getOrders, getOrderById, getOrdersByUser, postOrder, updateOrder, deleteOrder } from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/withAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router = express.Router();

//GET
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.get("/user/:id", getOrdersByUser);

//ACTIONS
router.post("/", verifyJWT, postOrder);
router.patch("/:id", verifyJWT, isAdmin, updateOrder);
router.delete("/:id", verifyJWT, isAdmin, deleteOrder);

export default router;
