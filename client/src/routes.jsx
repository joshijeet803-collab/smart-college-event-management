import { useEffect, useState } from "react";

function ManageEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const handleDelete = (index) => {
    const updated = events.filter((_, i) => i !== index);
    setEvents(updated);
    localStorage.setItem("events", JSON.stringify(updated));
  };

  return (
    <div style={{ color: "white", padding: "20px" }}>
      <h2>Manage Events</h2>

      {events.length === 0 ? (
        <p>No Events Found</p>
      ) : (
        events.map((event, index) => (
          <div key={index} style={{ margin: "10px 0" }}>
            <h3>{event.eventName}</h3>
            <p>{event.date}</p>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ManageEvents;