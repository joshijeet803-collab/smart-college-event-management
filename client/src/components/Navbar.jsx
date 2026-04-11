import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
  localStorage.removeItem("userEmail");
  window.location.href = "/";
};

  return (
    <div className="navbar">
      <div className="logo">CollegeEvents</div>

      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/my-events">My Events</Link>
        <a href="/admin" target="_blank" className="admin-btn">Admin</a>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;