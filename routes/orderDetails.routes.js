import express from "express";
import {
  getOrderDetails,
  getOrderDetailsById,
  getOrderDetailsByOrder,
  getOrderDetailsByProduct,
  postOrderDetails,
  updateOrderDetails,
  deleteOrderDetails,
} from "../controllers/orderDetails.controller.js";
import { verifyJWT } from "../middlewares/withAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

//GET
router.get("/", getOrderDetails);
router.get("/:id", getOrderDetailsById);
router.get("/order/:id", getOrderDetailsByOrder);
router.get("/product/:id", getOrderDetailsByProduct);

//ACTIONS
router.post("/", verifyJWT, postOrderDetails);
router.patch("/:id", verifyJWT, updateOrderDetails);
router.delete("/:id", verifyJWT, deleteOrderDetails);

export default router;
