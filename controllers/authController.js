import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import User from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });

    res.status(201).json({
      status: "success",
      message: "Registered Successfully",
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

// POST Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(404).send({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    // check user existance
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        status: "fail",
        message: "Email is not registered",
      });
    }

    // Check password
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        status: "fail",
        message: "Invalid password",
      });
    }

    // Create token if email and password is valid
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });

    res.status(200).send({
      status: "success",
      message: "login successfull",
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        id: user._id,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      message: "Error in login",
      error,
    });
  }
};

// forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    // validate
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }

    // check
    const user = await User.findOne({ email, answer });

    if (!user) {
      return res.status(404).send({
        status: "fail",
        message: "Wrong email address",
      });
    }

    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      status: "success",
      message: "password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      message: "Something went wrong",
      error,
    });
  }
};

// testController
export const testController = async (req, res) => {
  res.send("Protected route");
};
