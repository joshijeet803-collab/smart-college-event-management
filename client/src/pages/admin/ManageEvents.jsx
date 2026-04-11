import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const loadEvents = async () => {
    const res = await fetch("http://localhost:5000/api/events");
    const data = await res.json();
    setEvents(data);
  };

  const loadRegistrations = async () => {
    const res = await fetch("http://localhost:5000/api/registrations");
    const data = await res.json();
    setRegistrations(data);
  };

  useEffect(() => {
    loadEvents();
    loadRegistrations();
  }, []);

  // 🔥 FIXED DELETE EVENT
  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return; // confirm box

    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log("DELETE RESPONSE:", data);

      if (res.ok) {
        alert("Event Deleted ✅");

        // 🔥 UI instantly update (NO reload needed)
        setEvents(events.filter((e) => e._id !== id));

      } else {
        alert("Delete Failed ❌");
      }

    } catch (err) {
      console.log(err);
      alert("Server Error ❌");
    }
  };

  // 🔥 FIXED DELETE REGISTRATION
  const deleteRegistration = async (id) => {
    if (!window.confirm("Delete this registration?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/registrations/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log("DELETE REG:", data);

      if (res.ok) {
        alert("Registration Deleted ✅");

        // 🔥 UI update
        setRegistrations(registrations.filter((r) => r._id !== id));

      } else {
        alert("Delete Failed ❌");
      }

    } catch (err) {
      console.log(err);
      alert("Server Error ❌");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">

        <h1>Manage Events</h1>

        <div className="events-grid">
          {events.map((event) => (
            <div className="event-card" key={event._id}>
              <img src={event.image} alt="" />
              <h3>{event.title}</h3>
              <p>{event.date}</p>

              {/* ✅ ID correctly passed */}
              <button onClick={() => deleteEvent(event._id)}>
                Delete Event
              </button>
            </div>
          ))}
        </div>

        <h2>Event Registrations</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Event ID</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {registrations.map((reg) => (
              <tr key={reg._id}>
                <td>{reg.name}</td>
                <td>{reg.email}</td>
                <td>{reg.eventId}</td>

                <td>
                  <button onClick={() => deleteRegistration(reg._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </AdminLayout>
  );
}

export default ManageEvents;