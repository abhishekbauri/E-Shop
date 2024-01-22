import slugify from "slugify";
import Category from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    // check if category already existed
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res.status(200).json({
        status: "success",
        message: "Category already existed",
      });
    }

    const category = await Category.create({ name, slug: slugify(name) });

    res.status(201).send({
      status: "success",
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      message: "Error in category",
      error,
    });
  }
};

// update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true },
    );

    res.status(200).send({
      status: "success",
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      message: "Error in updating category",
      error,
    });
  }
};

// get all category
export const getAllCategoryController = async (req, res) => {
  try {
    const category = await Category.find();

    res.status(200).send({
      status: "success",
      message: "All categories list",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      message: "Can not get all category",
      error,
    });
  }
};

// get category by slug
export const singleCategoryController = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });

    res.status(200).send({
      status: "success",
      message: "Category found successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: "fail",
      message: "Can not find required category",
      error,
    });
  }
};

// delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);

    res.status(200).send({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      message: "Can not delete category",
      error,
    });
  }
};
