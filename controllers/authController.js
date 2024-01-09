import { hashPassword } from "../helpers/authHelper.js";
import User from "../models/userModel.js";

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      message: "Error in Registration",
      error,
    });
  }
};

export default registerController;
