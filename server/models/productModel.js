import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product must have some name"],
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Product must have some description"],
    },
    price: {
      type: Number,
      required: [true, "Product must have some price"],
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: [true, "Product must have some category"],
    },
    quantity: {
      type: Number,
      required: [true, "Product must have some quantity"],
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
