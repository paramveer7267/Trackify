import express from"express"
import { adminLogin,adminLogout,adminSignup } from "../controllers/auth.admin.controller.js";
const router = express.Router();

router.get("/signup",adminSignup)
router.get("/login",adminLogin)
router.get("/logout",adminLogout)

export default router