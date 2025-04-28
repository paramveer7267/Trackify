import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    assignedTickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
      }
    ],
    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin"
    }
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", adminSchema);