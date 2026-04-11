import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/client/Login";
import Register from "./pages/client/Register";
import Home from "./pages/client/Home";
import Events from "./pages/client/Events";
import MyEvents from "./pages/client/MyEvents";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateEvent from "./pages/admin/CreateEvent";
import ManageEvents from "./pages/admin/ManageEvents";

function Layout() {
  const location = useLocation();

  // ❌ Hide Navbar on login pages
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname === "/admin";

  // ❌ Hide Navbar on ALL admin pages
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {/* ✅ ONLY CLIENT NAVBAR */}
      {!hideNavbar && !isAdmin && <Navbar />}

      <Routes>
        {/* Client */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/my-events" element={<MyEvents />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<CreateEvent />} />
        <Route path="/admin/manage" element={<ManageEvents />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Layout />
      </div>
    </BrowserRouter>
  );
}
export default App;