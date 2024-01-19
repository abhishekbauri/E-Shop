import exrpress from "express";
import {
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

router.get("/test", requireSignIn, isAdmin, testController);

// protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
