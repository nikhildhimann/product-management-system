import express from "express";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, image } = req.body;
  const io = req.app.get("socketio");

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields." });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists." });
  }

  try {
    const user = await User.create({ name, email, password, image });

    // Emit a real-time event
    const userCount = await User.countDocuments();
    io.emit("userUpdate", userCount);

    await sendEmail(
      email,
      "Welcome to Product Management System",
      `<h1>Hi ${name},</h1><p>Welcome to our platform! 🎉</p>`
    );

    res.status(201).json({
      ...user._doc,
      token: generateToken(user),
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid user data." });
  }
});


// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields." });
    }
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            ...user._doc, // Send all user details
            token: generateToken(user) // Generate token with full user object
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});

// GET User Profile
router.get("/profile", protect, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// UPDATE User Profile
router.put("/profile", protect, async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.image = req.body.image || user.image;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            ...updatedUser._doc,
            token: generateToken(updatedUser)
        });

    } else {
        res.status(404).json({ message: "User not found" });
    }
});


// Get all users (admin only)
router.get("/", protect, admin, async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;