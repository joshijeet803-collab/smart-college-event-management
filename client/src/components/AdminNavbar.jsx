import { useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <div className="admin-navbar">
      <h2>Admin Panel</h2>
      <div className="admin-nav-links">
        <button onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/admin/create")}>Create Event</button>
        <button onClick={() => navigate("/admin/manage")}>
          Manage Events
        </button>
        <button className="logout-btn" onClick={() => navigate("/admin")}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminNavbar;