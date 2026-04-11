import { useEffect, useState } from "react";  
import Navbar from "../../components/Navbar";  
import Footer from "../../components/Footer";  
import "./Events.css";  
  
function Events() {  
  const [events, setEvents] = useState([]);  
  
  const [showForm, setShowForm] = useState(false);  
  const [selectedEvent, setSelectedEvent] = useState(null);  
  
  const [form, setForm] = useState({  
    name: "",  
    email: "",  
  });  
  
  const [errors, setErrors] = useState({});  
  
  useEffect(() => {  
    loadEvents();  
  }, []);  
  
  const loadEvents = async () => {  
    const res = await fetch("http://localhost:5000/api/events");  
    const data = await res.json();  
    setEvents(data);  
  };  
  
  // ✅ VALIDATION  
  const validate = () => {  
    let newErrors = {};  
  
    if (!form.name) {  
      newErrors.name = "Name required";  
    }  
  
    if (!form.email) {  
      newErrors.email = "Email required";  
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {  
      newErrors.email = "Invalid email";  
    }  
  
    setErrors(newErrors);  
    return Object.keys(newErrors).length === 0;  
  };  
  
  // ✅ REGISTER SUBMIT  
  const handleSubmit = async () => {  
    if (!validate()) return;  
  
    try {  
      const res = await fetch("http://localhost:5000/api/register", {  
        method: "POST",  
        headers: {  
          "Content-Type": "application/json",  
        },  
        body: JSON.stringify({  
          eventId: selectedEvent._id,  
          eventTitle: selectedEvent.title,  
          image: selectedEvent.image,  
          name: form.name,  
          email: form.email,  
        }),  
      });  
  
      const data = await res.json();  
  
      if (res.status === 201) {  
        alert("Registered Successfully ✅");  
        setShowForm(false);  
        setForm({ name: "", email: "" });  
        setErrors({});  
      } else {  
        alert(data.error || "Error ❌");  
      }  
    } catch (err) {  
      console.log(err);  
    }  
  };  
  
  return (  
    <>  
      <Navbar />  
  
      <div className="events-page">  
        <h1>Available Events</h1>  
  
        <div className="events-grid">  
          {events.map((event) => (  
              
            <div className="event-card" key={event._id}>  
              <img src={event.image} alt={event.title} />  
  
              <div className="event-card-content">  
                <h3>{event.title}</h3>  
                <p>{event.date}</p>  
  
                <button  
                  onClick={() => {  
                    setSelectedEvent(event);  
                    setShowForm(true);  
                  }}  
                >  
                  🚀 Register  
                </button>  
              </div>  
            </div>  
              
          ))}  
        </div>  
  
        {/* 🔥🔥🔥 FINAL MODAL (CENTER FIXED) */}  
        {showForm && (  
          <div className="modal-overlay">  
            <div className="modal-box">  
  
              <h2 className="modal-title">  
                Register for {selectedEvent?.title}  
              </h2>  
  
              <input  
                type="text"  
                placeholder="Your Name"  
                value={form.name}  
                onChange={(e) =>  
                  setForm({ ...form, name: e.target.value })  
                }  
              />  
              {errors.name && <p>{errors.name}</p>}  
  
              <input  
                type="email"  
                placeholder="Your Email"  
                value={form.email}  
                onChange={(e) =>  
                  setForm({ ...form, email: e.target.value })  
                }  
              />  
              {errors.email && <p>{errors.email}</p>}  
  
              <button onClick={handleSubmit}>  
                🚀 Submit  
              </button>  
  
              <button  
                className="cancel-btn"  
                onClick={() => setShowForm(false)}  
              >  
                Cancel  
              </button>  
  
            </div>  
          </div>  
        )}  
      </div>  
  
      {/* ✅ ONLY ADD THIS */}
      <Footer />  
  
    </>  
  );  
}  
  
export default Events;