import express from "express";
import colors from "colors";
import dotenv from "dotenv";

// configure env
dotenv.config();

const app = express();

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
