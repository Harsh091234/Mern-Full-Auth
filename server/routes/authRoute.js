import express from "express";
import { login, logout, signup, verifyEmail, forgotPassword, resetPassword, checkAuth} from "../controllers/authController.js";
import { protectRoutes } from "../middlewares/protectRoutes.js";



const router = express.Router();


router.get("/check-auth", protectRoutes, checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protectRoutes, logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword);



export default router;