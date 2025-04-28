import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js"; // Import the User model
import { validationResult } from "express-validator"; // For input validation

// Sign-up controller
export const userSignup = async (req, res) => {
  try {
    // Validate the request body (you should add validation middleware in routes)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "Email is already registered" });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({
      msg: "User registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export async function userLogin(req, res) {
  res.send("signup is ready");
}
export async function userLogout(req, res) {
  res.send("signup is ready");
}
