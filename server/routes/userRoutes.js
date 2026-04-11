const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
  const { name, email, password, role } = req.body;

const newUser = new User({
  name,
  email,
  password,
  role: role || "user"
});

    await newUser.save();

    res.json({ message: "Registration Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log(req.body); // 👈 ADD THIS

    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    res.json({
      message: "Login Success",
      token: "dummy_token",
      user: {
        email: user.email,
        role: user.role || "user"
      }
    });

  } catch (error) {
    console.log(error); // 👈 IMPORTANT
    res.status(500).json({ message: "Login error" });
  }
});

module.exports = router;