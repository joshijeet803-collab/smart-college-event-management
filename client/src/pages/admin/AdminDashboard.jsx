import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import "./Admin.css";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    document.title = "Admin Panel";
    fetch("https://smart-college-backend-3fnx.onrender.com/api/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(() => setEvents([]));

    fetch("https://smart-college-backend-3fnx.onrender.com/api/registrations")
      .then(res => res.json())
      .then(data => setRegistrations(data))
      .catch(() => setRegistrations([]));
  }, []);

  return (
    <AdminLayout>
      <div className="admin-page">
        
        <div className="admin-dashboard">
          
          <h1 className="dashboard-title">Admin Dashboard</h1>

          <div className="dashboard-stats">

            <div className="stat-card">
              <h2>{events?.length || 0}</h2>
              <p>Total Events</p>
            </div>

            <div className="stat-card">
              <h2>{registrations?.length || 0}</h2>
              <p>Total Registrations</p>
            </div>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;