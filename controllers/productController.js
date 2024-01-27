import fs from "fs";
import Product from "../models/productModel.js";
import slugify from "slugify";

export const createPrdouctController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    if (photo && photo.size > 1000000) {
      return res
        .status(500)
        .send({ error: "Photo is required and should be less than 1mb" });
    }

    const products = new Product({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    res.status(201).send({
      status: "success",
      message: "Products created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      message: "Error in creating product",
      error,
    });
  }
};

// get all products
export const getProductController = async (req, res) => {
  try {
    // getting product details without photo for making our response fast
    const products = await Product.find()
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(201).send({
      status: "success",
      total_products: products.length,
      message: "All products list",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      message: "Error in getting all product",
      error: error.message,
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const products = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.status(201).send({
      status: "success",
      message: "Product found successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      message: "product not found",
      error: error.message,
    });
  }
};

// get product photos
export const productPhotoController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select("photo");

    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      message: "Error while getting product photo",
      error: error.message,
    });
  }
};

// delete product
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id).select("-photo");

    res.status(200).send({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      message: "Error while deleting product",
      error: error.message,
    });
  }
};

// update product
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    if (photo && photo.size > 1000000) {
      return res
        .status(500)
        .send({ error: "Photo is required and should be less than 1mb" });
    }

    const products = await Product.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true },
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    res.status(201).send({
      status: "success",
      message: "Products updated successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      message: "Error in updating product",
      error,
    });
  }
};

// filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Product.find(args);
    res.status(200).send({
      status: "success",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "fail",
      message: "Error in filtering product",
      error,
    });
  }
};

// count prducts
export const productCountController = async (req, res) => {
  try {
    const total = await Product.find().estimatedDocumentCount();
    res.status(200).send({
      status: "success",
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "fail",
      message: "Error in product count",
      error,
    });
  }
};

// product list based on page
export const productListController = async (req, res) => {
  try {
    const perPage = 4;
    const page = req.params.page ? req.params.page : 1;
    const products = await Product.find()
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      status: "success",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "fail",
      message: "Error in product count",
      error,
    });
  }
};
