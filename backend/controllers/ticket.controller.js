import { Ticket } from "../models/ticket.model.js";
import User from "../models/user.model.js"; // optional, if you need user data for some operations

// Create a new ticket
export const createTicket = async (req, res) => {
  try {
    const { title, description, priority,status } = req.body;
    const userId = req.user._id; // Assuming you have a user object set by the auth middleware

    const newTicket = new Ticket({
      title,
      description,
      priority,
      status,
      createdBy: userId,
    });

    await newTicket.save();
    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket: newTicket,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all tickets (Admin only)
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get tickets for the logged-in user
export const getUserTickets = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have a user object set by the auth middleware
    const tickets = await Ticket.find({ createdBy: userId });
    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update the status of a ticket (Admin only)
export const updateTicketStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body;

    // Validate the status
    const allowedStatuses = ["open", "in_progress", "resolved", "closed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Allowed statuses are: open, in_progress, resolved, closed.",
      });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    // Update ticket status
    ticket.status = status;
    await ticket.save();

    res.status(200).json({
      success: true,
      message: "Ticket status updated successfully",
      ticket,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export async function authCheck(req, res) {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.log("Error in authCheck:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}