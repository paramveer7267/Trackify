import express from"express"
import { userLogin,userLogout,userSignup } from "../controllers/auth.user.controller.js";
const router = express.Router();

router.get("/signup",userSignup)
router.get("/login",userLogin)
router.get("/logout",userLogout)

export default router