import exrpress from "express";
import registerController from "../controllers/authController.js";

// Router object
const router = exrpress.Router();

// Routing
// Register || Method POST

router.post("/register", registerController);

export default router;
