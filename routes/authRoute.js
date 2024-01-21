import exrpress from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// Router object
const router = exrpress.Router();

// Routing
// Register || Method POST

router.post("/register", registerController);
router.post("/login", loginController);

// Forgot password
router.post("/forgot-password", forgotPasswordController);

// testing protected route
router.get("/test", requireSignIn, isAdmin, testController);

// protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// for admin dashboard
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
