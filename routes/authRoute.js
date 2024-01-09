import exrpress from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

// Router object
const router = exrpress.Router();

// Routing
// Register || Method POST

router.post("/register", registerController);
router.post("/login", loginController);

export default router;
