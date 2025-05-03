import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "in_progress", "resolved", "assigned"],
      default: "new",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      default: null,
    },
    priority: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Ticket = mongoose.model(
  "Ticket",
  ticketSchema
);
