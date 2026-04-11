const jwt = require("jsonwebtoken");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

console.log("INDEX.JS RUNNING");

app.use(cors());
app.use(express.json());

// ================= DB =================
// ✅ FIXED DATABASE NAME
mongoose.connect("mongodb://127.0.0.1:27017/college-events")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ================= SCHEMA =================
const EventSchema = new mongoose.Schema({
  title: String,
  date: String,
  image: String,
  description: String,
});

const RegistrationSchema = new mongoose.Schema({
  eventId: String,
  eventTitle: String,
  image: String,
  name: String,
  email: String,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "user" }
});

const Event = mongoose.model("Event", EventSchema);
const Registration = mongoose.model("Registration", RegistrationSchema);
const User = mongoose.model("User", UserSchema);

// ================= MIDDLEWARE =================
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin only" });
  }
  next();
};

// ================= TEST =================
app.get("/", (req, res) => {
  res.send("API WORKING 🚀");
});

// ================= EVENTS =================
app.get("/api/events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.post("/api/events", verifyToken, async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.status(201).json({ message: "Event Created", event });
});

app.delete("/api/events/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// ================= REGISTER EVENT =================
app.post("/api/register", async (req, res) => {
  try {
    const { eventId, eventTitle, image, name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name & Email required" });
    }

    const reg = new Registration({
      eventId,
      eventTitle,
      image,
      name,
      email,
    });

    await reg.save();

    res.status(201).json({ message: "Registered Successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= AUTH =================

// REGISTER
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ✅ VALIDATION FIX
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await user.save();

    res.json({ message: "User Registered" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ VALIDATION FIX
    if (!email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successful",
      token,
      user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= REGISTRATIONS =================
app.get("/api/registrations", async (req, res) => {
  try {
    const data = await Registration.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/registrations/:id", async (req, res) => {
  await Registration.findByIdAndDelete(req.params.id);
  res.json({ message: "Registration Deleted" });
});

// ================= START =================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});