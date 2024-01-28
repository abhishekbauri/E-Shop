import express from "express";

import { requireSignIn, isAdmin } from "./../middlewares/authMiddleware.js";
import {
  createPrdouctController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  searchProductController,
  similarProductController,
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

// count products
router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);

// search product
router.get("/search/:keyword", searchProductController);

// similar (recommended) products
router.get("/similar-product/:pid/:cid", similarProductController);

// category wise product
router.get("/product-category/:slug", productCategoryController);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController,
);

export default router;
