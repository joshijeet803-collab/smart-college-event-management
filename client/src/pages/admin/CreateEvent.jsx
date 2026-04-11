import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const createEvent = async () => {
    try {
      if (!title || !date) {
        alert("Title and Date required ❌");
        return;
      }

      console.log("Sending:", { title, date, image, description });

      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          date,
          image,
          description,
        }),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.status === 201) {
        alert("Event Created ✅");

        // ✅ FIXED ROUTE
        window.location.href = "/admin/manage";
      } else {
        alert(data.error || "Error ❌");
      }

      setTitle("");
      setDate("");
      setImage("");
      setDescription("");

    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <h1>Create Event</h1>

        <div className="admin-form">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={createEvent}>
            Create Event
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default CreateEvent;