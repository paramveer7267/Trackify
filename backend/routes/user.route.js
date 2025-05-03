import express from "express";
import {
  createTicket,
  getUserTickets,
  getAssignedTickets,
  getTicketById,
  updateTicketStatus,
  getUser,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Create a ticket (any user)
router.post("/create", protectRoute, createTicket);

// Get tickets for the logged-in user
router.get("/user", protectRoute, getUserTickets);
router.get("/user/:id", protectRoute, getUser);

router.get("/tickets/:id", protectRoute, getTicketById);

// for engineer assigned tickets
router.get(
  "/assigned-tickets",
  protectRoute,
  getAssignedTickets
);

// Update ticket status (admin & engineer only)
router.patch(
  "/:ticketId/status",
  protectRoute,
  updateTicketStatus
);
export default router;


