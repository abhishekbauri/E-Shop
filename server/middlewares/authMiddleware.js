import JWT from "jsonwebtoken";
import User from "../models/userModel.js";

// Protected Route token based
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

// admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    // role =0 -> admin
    // role =1 -> normal user
    if (user.role !== 1) {
      return res.status(401).send({
        status: "fail",
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: fail,
      error,
      message: "Error in admin middleware",
    });
  }
};
