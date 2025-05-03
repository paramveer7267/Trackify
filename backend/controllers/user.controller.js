import { Ticket } from "../models/ticket.model.js";
import User from "../models/user.model.js"; // optional, if you need user data for some operations

// Create a new ticket
export const createTicket = async (req, res) => {
  try {
    const { title, description, priority, category } =
      req.body;
    const userId = req.user._id; // Assuming you have a user object set by the auth middleware

    const newTicket = new Ticket({
      title,
      description,
      priority,
      category,
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
    res
      .status(500)
      .json({ success: false, message: "Server error" });
  }
};

// Get tickets for the logged-in user
export const getUserTickets = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have a user object set by the auth middleware
    const tickets = await Ticket.find({
      createdBy: userId,
    });
    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error" });
  }
};
export const getAssignedTickets = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "engineer") {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. Only engineers can view assigned tickets.",
      });
    }

    // Now fetch tickets using assignedTickets array
    const assignedTickets = await Ticket.find({
      _id: { $in: user.assignedTickets },
    }).populate("createdBy", "name email"); // if you want to show creator details

    res.status(200).json({
      success: true,
      tickets: assignedTickets,
    });
  } catch (err) {
    console.error("Error fetching assigned tickets:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update the status of a ticket (Admin & engineer only)
export const updateTicketStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const { ticketId } = req.params;
    const { status } = req.body;

    if (user.role !== "engineer") {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. Only engineers can change status of assigned tickets.",
      });
    }
    // Validate the status
    const allowedStatuses = [
      "open",
      "in_progress",
      "resolved",
      "closed",
    ];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Allowed statuses are: open, in_progress, resolved, closed.",
      });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
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
    res
      .status(500)
      .json({ success: false, message: "Server error" });
  }
};

// Get a ticket by ID (for user and admin)
export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id).populate(
      "createdBy",
      "name email"
    );
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }
    res.status(200).json({
      success: true,
      ticket,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error" });
  }
};
