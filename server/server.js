const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); 
console.log("🚀 SERVER FILE RUNNING...");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ================= DB CONNECT =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

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

const Event = mongoose.model("Event", EventSchema);
const Registration = mongoose.model("Registration", RegistrationSchema);

// ================= ROUTES =================

// GET EVENTS
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD EVENT
app.post("/api/events", async (req, res) => {
  try {
    const { title, date, image, description } = req.body;

    if (!title || !date) {
      return res.status(400).json({ error: "Title & Date required" });
    }

    const event = new Event({ title, date, image, description });
    await event.save();

    res.status(201).json({ message: "Event Created", event });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE EVENT
app.delete("/api/events/:id", async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event Deleted Successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE EVENT
app.put("/api/events/:id", async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// REGISTER
app.post("/api/register", async (req, res) => {
  try {
    const reg = new Registration(req.body);
    await reg.save();
    res.status(201).json({ message: "Registered" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET REGISTRATIONS
app.get("/api/registrations", async (req, res) => {
  try {
    const data = await Registration.find();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE REGISTRATION
app.delete("/api/registrations/:id", async (req, res) => {
  try {
    const deleted = await Registration.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Registration not found" });
    }

    res.json({ message: "Registration Deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= START =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});