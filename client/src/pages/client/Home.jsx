import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  // Protection - if not logged in redirect to login
  useEffect(() => {
    document.title = "Client";
    const user = localStorage.getItem("userEmail");
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className="home">
        <div className="hero">
          <h1>Smart College Event Management System</h1>
          <p>
            Discover hackathons, coding competitions and workshops happening in your college
          </p>

          <button 
            className="explore-btn"
            onClick={() => navigate("/events")}
          >
            🚀 Explore Events
          </button>
        </div>
      </div>

      {/* ✅ Footer yaha add kiya */}
      <Footer />
    </>
  );
}

export default Home;