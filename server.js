import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";

// configure env
dotenv.config();

// database config
connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));

// rest api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to e-commerce app",
  });
});

// PORT
const PORT = process.env.PORT;

// listen server
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.MODE} mode on PORT: ${PORT}`.bgBlue,
  );
});
