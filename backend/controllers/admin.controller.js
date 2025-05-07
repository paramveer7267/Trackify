import { Ticket } from "../models/ticket.model.js";
import User from "../models/user.model.js"; // optional, if you need user data for some operations
import mongoose from "mongoose";
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
    res
      .status(500)
      .json({ success: false, message: "Server error" });
  }
};

// Get all tickets (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error" });
  }
};

// Get tickets by userId
export const getTicketsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Optional: Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Fetch tickets created by this user
    const tickets = await Ticket.find({
      createdBy: userId,
    });

    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets by user:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update the status of a ticket (Admin only)
export const updateTicketStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body;

    // Validate the status
    const allowedStatuses = [
      "new",
      "in_progress",
      "resolved",
      "assigned",
      "not_resolved",
    ];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Allowed statuses are: new, in_progress, resolved, assigned, not_resolved.",
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

// assign the ticket to engineer
export const assignTicketToEngineer = async (req, res) => {
  try {
    const { ticketId, engineerId } = req.body;

    // Validate input
    if (!ticketId || !engineerId) {
      return res.status(400).json({
        success: false,
        message: "ticketId and engineerId are required",
      });
    }

    // Find the ticket
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    // Find the engineer
    const engineer = await User.findById(engineerId);
    if (!engineer || engineer.role !== "engineer") {
      return res.status(400).json({
        success: false,
        message:
          "Engineer not found or user is not an engineer",
      });
    }

    // Assign the ticket
    ticket.assignedTo = engineerId;
    ticket.status = "assigned"; // Set status to 'assigned' or use the provided status
    await ticket.save();

    // Optional: If you are storing assigned tickets in Engineer's document (assignedTickets array), you can push ticketId
    if (engineer.assignedTickets) {
      engineer.assignedTickets.push(ticketId);
      await engineer.save();
    }

    res.status(200).json({
      success: true,
      message: "Ticket assigned to engineer successfully",
      ticket,
    });
  } catch (error) {
    console.error(
      "Error assigning ticket to engineer:",
      error
    );
    res.status(500).json({
      success: false,
      message: "Server error",
    });
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
