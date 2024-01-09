import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Auser must have a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "A user must have a email"],
      unique: true,
      lowerCase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "A user must have a password"],
      min: 5,
    },
    phone: {
      type: String,
      required: [true, "Auser must have a phone number"],
    },
    address: {
      type: String,
      required: [true, "A user must have a address"],
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
