import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import cors from "cors";

// configure env
dotenv.config();

// database config
connectDB();

const app = express();

// middleware
const corsOptions = {
  origin: "https://e-shop-by-akb.vercel.app",
  credentials: true 
};

app.use(cors(corsOptions));

// for development
// app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

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
    `Server running on ${process.env.NODE_ENV} mode on PORT: ${PORT}`.bgBlue,
  );
});
