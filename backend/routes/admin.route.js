import express from "express";
import {
  getAllTickets,
  getAllUsers,
  getTicketsByUser,
  updateTicketStatus,
  assignTicketToEngineer,
  authCheck,
  getAllEngineers,
  deleteTicket,
} from "../controllers/admin.controller.js";

const router = express.Router();

// Get all tickets (admin only)
router.get(
  "/all-tickets",
  getAllTickets
);

// Get all users (admin only)
router.get(
  "/all-users",
  getAllUsers
);
router.get(
  "/all-engineers",
  getAllEngineers
);

// Get tickets for the logged-in user
router.get(
  "/:userId/tickets",
  getTicketsByUser
);

// Update ticket status (admin only)
router.patch(
  "/:ticketId/status",
  updateTicketStatus
);

router.patch(
  "/assigned-ticket",
  assignTicketToEngineer
);

router.delete(
  "/delete/:ticketId",
  deleteTicket
);

export default router;
