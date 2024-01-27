import express from "express";

import { requireSignIn, isAdmin } from "./../middlewares/authMiddleware.js";
import {
  createPrdouctController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productFiltersController,
  productPhotoController,
  updateProductController,
} from "../controllers/productController.js";
// for storing image
import formidable from "express-formidable";

const router = express.Router();

// routes
// create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createPrdouctController,
);

// get products
router.get("/get-product", getProductController);

// get single products
router.get("/get-product/:slug", getSingleProductController);

// get photo
router.get("/product-photo/:pid", productPhotoController);

// delete product
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController,
);

// filter products
router.post("/product-filters", productFiltersController);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController,
);

export default router;
