import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "engineer"],
      default: "user",
    },
    assignedTickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
    specialization: {
      type: String,
      required:true,
      default: "General Support",
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
