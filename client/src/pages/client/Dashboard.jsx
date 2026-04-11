import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Dashboard() {
  return (
    <div className="page-container">
      <Navbar />

      <h1 className="page-title">User Dashboard</h1>
      <p style={{ textAlign: "center" }}>
        Welcome! You can view and manage your registered events here.
      </p>

      <Footer />
    </div>
  );
}

export default Dashboard;