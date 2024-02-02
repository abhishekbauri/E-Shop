import mongoose from "mongoose";

const connectDB = async () => {
  const DB = process.env.DATABASE_URL.replace(
    "<password>",
    process.env.DATABASE_PASSWORD,
  );

  try {
    const conn = await mongoose.connect(DB);
    console.log(`Connected to database....`.bgMagenta);
  } catch (error) {
    console.log(`Error in database connection ${error}`.bgRed);
  }
};

export default connectDB;
