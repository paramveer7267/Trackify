import express from "express";
import {
  createTicket,
  getAllTickets,
  getUserTickets,
  updateTicketStatus,
} from "../controllers/ticket.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { isAdmin } from "../middleware/isAdmin.js";


const router = express.Router();

// Create a ticket (any user)
router.post("/create",protectRoute, createTicket);

// Get all tickets (admin only)
router.get("/all",protectRoute,isAdmin, getAllTickets);

// Get tickets for the logged-in user
router.get("/user",protectRoute, getUserTickets);

// Update ticket status (admin only)
router.patch("/:ticketId",protectRoute,isAdmin, updateTicketStatus);

export default router;
