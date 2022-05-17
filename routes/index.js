import express from "express";
import jwt from "jsonwebtoken";

import categoryRoutes from "./category.routes.js";
import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";
import orderRoutes from "./order.routes.js";
import detailsRoutes from "./orderDetails.routes.js";
import authRoutes from "./auth.routes.js";
import uploadRoutes from "./upload.routes.js";
import mailRoutes from "./mail.routes.js";

const router = express.Router();

router.use("/api/v1/users", userRoutes);
router.use("/api/v1/categories", categoryRoutes);
router.use("/api/v1/products", productRoutes);
router.use("/api/v1/orders", orderRoutes);
router.use("/api/v1/order-details", detailsRoutes);
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/upload", uploadRoutes);
router.use("/validate-email", mailRoutes);

router.use("/*", (req, res, next) => {
  return res.json({
    status: 404,
    message: "not found",
  });
});
export default router;
