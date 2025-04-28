import { Admin } from "../models/admin.model.js"; // adjust path if needed
import bcrypt from "bcryptjs";

/**
 * Admin signup controller
 */
export const adminSignup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Basic validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    }

    // 2. Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(409)
        .json({
          message:
            "Admin already registered with this email",
        });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create new Admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: role || "admin", // Optional: allow setting role during signup
    });

    await newAdmin.save();

    // 5. Respond back
    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res
      .status(500)
      .json({ message: "Internal server error" });
  }
};

export async function adminLogin(req, res) {
  res.send("signup is ready");
}
export async function adminLogout(req, res) {
  res.send("signup is ready");
}
