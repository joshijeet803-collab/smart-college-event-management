const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

console.log("🚀 SERVER FILE RUNNING..."); // 🔥 DEBUG

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ================= DB CONNECT =================
mongoose.connect("mongodb://127.0.0.1:27017/collegeEvents")
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

// ✅ GET EVENTS
app.get("/api/events", async (req, res) => {
  console.log("🔥 API HIT → GET /api/events"); // 🔥 DEBUG

  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.log("❌ GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD EVENT
app.post("/api/events", async (req, res) => {
  console.log("🔥 API HIT → POST /api/events");
  console.log("BODY:", req.body); // 🔥 DEBUG

  try {
    const { title, date, image, description } = req.body;

    if (!title || !date) {
      return res.status(400).json({ error: "Title & Date required" });
    }

    const event = new Event({
      title,
      date,
      image,
      description,
    });

    await event.save();

    res.status(201).json({ message: "Event Created", event });

  } catch (err) {
    console.log("❌ POST ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE EVENT
app.delete("/api/events/:id", async (req, res) => {
  console.log("🔥 API HIT → DELETE EVENT:", req.params.id);

  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event Deleted Successfully" });

  } catch (err) {
    console.log("❌ DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE EVENT
app.put("/api/events/:id", async (req, res) => {
  console.log("🔥 API HIT → UPDATE EVENT:", req.params.id);

  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    console.log("❌ UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ================= REGISTRATION =================

// ✅ REGISTER
app.post("/api/register", async (req, res) => {
  console.log("🔥 API HIT → REGISTER");

  try {
    const reg = new Registration(req.body);
    await reg.save();
    res.status(201).json({ message: "Registered" });

  } catch (err) {
    console.log("❌ REGISTER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET REGISTRATIONS
app.get("/api/registrations", async (req, res) => {
  console.log("🔥 API HIT → GET /api/registrations");

  try {
    const data = await Registration.find();
    res.json(data);

  } catch (err) {
    console.log("❌ REG GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE REGISTRATION
app.delete("/api/registrations/:id", async (req, res) => {
  console.log("🔥 API HIT → DELETE REG:", req.params.id);

  try {
    const deleted = await Registration.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Registration not found" });
    }

    res.json({ message: "Registration Deleted" });

  } catch (err) {
    console.log("❌ REG DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("❌ GLOBAL ERROR:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// ================= START =================
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});