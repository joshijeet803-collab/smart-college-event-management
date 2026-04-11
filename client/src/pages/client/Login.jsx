import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    // ✅ Basic validation
    if (!email || !password) {
      alert("Enter email and password ❌");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", { // ✅ FIXED API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ TOKEN SAVE (IMPORTANT)
        localStorage.setItem("token", data.token);

        // Optional: user info save
        localStorage.setItem("userEmail", data.user.email);

        alert("Login Successful ✅");

        navigate("/home");
      } else {
        alert(data.error || "Login Failed ❌");
      }

    } catch (err) {
      console.log(err);
      alert("Server Error ❌");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Student Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>

        <p>
          Don't have account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;