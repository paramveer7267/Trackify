import express from "express";
import {
  getAllTickets,
  getAllUsers,
  getTicketsByUser,
  updateTicketStatus,
  assignTicketToEngineer,
  authCheck,
} from "../controllers/admin.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

// Get all tickets (admin only)
router.get("/all-tickets", protectRoute, isAdmin, getAllTickets);

// Get all users (admin only)
router.get(
  "/all-users",
  protectRoute,
  isAdmin,
  getAllUsers
);

// Get tickets for the logged-in user
router.get("/:userId/tickets", protectRoute,isAdmin, getTicketsByUser);

// Update ticket status (admin only)
router.patch(
  "/:ticketId/status",
  protectRoute,
  isAdmin,
  updateTicketStatus
);


router.patch(
  "/assign-ticket",
  protectRoute,
  isAdmin,
  assignTicketToEngineer
);

router.get("/authCheck", protectRoute, isAdmin, authCheck);

export default router;
