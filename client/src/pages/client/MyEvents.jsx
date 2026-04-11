import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./MyEvents.css";

function MyEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadMyEvents();
  }, []);

  const loadMyEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/registrations");
      const data = await res.json();

      console.log("MyEvents Data:", data);

      setEvents(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="events-page">
        <h1>My Registered Events</h1>

        <div className="events-grid">
          {events.length === 0 ? (
            <p>No events registered ❌</p>
          ) : (
            events.map((event) => (
              <div className="event-card" key={event._id}>
                <img src={event.image} alt="" />
                <h3>{event.eventTitle}</h3>
                <p>{event.name}</p>
                <p>{event.email}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ✅ ONLY ADD THIS */}
      <Footer />

    </>
  );
}

export default MyEvents;