import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      alert("Enter email and password ❌");
      return;
    }

    // 🔥 DEBUG (VERY IMPORTANT)
    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    try {
      const res = await fetch("https://smart-college-backend-3fnx.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),        // ✅ FIX
          password: password.trim(),  // ✅ FIX
        }),
      });

      const data = await res.json();

      // 🔥 DEBUG RESPONSE
      console.log("LOGIN DATA:", data);

      if (res.ok) {

        // ✅ ADMIN CHECK (SAFE)
        if (
          !data.user ||
          !data.user.role ||
          data.user.role.toLowerCase() !== "admin"
        ) {
          alert("Access Denied ❌ (Not Admin)");
          return;
        }

        // ✅ SAVE TOKEN
        localStorage.setItem("token", data.token);
        localStorage.setItem("adminEmail", data.user.email);

        alert("Admin Login Successful ✅");

        navigate("/admin/dashboard");

      } else {
        alert(data.error || "Login Failed ❌");
      }

    } catch (err) {
      console.log("ERROR:", err);
      alert("Server Error ❌");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default AdminLogin;