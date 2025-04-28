import express from "express";
import {
  adminLogin,
  adminLogout,
  adminSignup,
  authCheck
} from "../controllers/auth.admin.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { isAdmin } from "../middleware/isAdmin.js";
const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/logout", adminLogout);
// router.get('/dashboard', protectRoute, isAdmin, adminDashboard);

router.get("/authCheck",protectRoute, authCheck);
export default router;
