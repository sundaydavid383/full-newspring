import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormMessage from "../../components/FormMessage/FormMessage";
import "./loginForm.css";
import Loading from "../../components/loading/Loading";

const LoginForm = ({ onSuccess }) => {
  const base_Url = "https://full-newspring.onrender.com/";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");
  const [type, setType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setType("error");
      setMessage("⚠️ Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      setLoadingMessage("Logging in...")

      const response = await fetch(`${base_Url}api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setType("error");
        setMessage(data?.message || "⚠️ Invalid login details. Try again.");
        setLoading(false);
        return;
      }

      // ✅ Save user
      localStorage.setItem("TIM412user", JSON.stringify(data.data));

      setType("success");
      setMessage("✅ Login successful! Redirecting...");
      setLoading(false);
      setLoadingMessage("")

      // Redirect after 2s
      setTimeout(() => {
        onSuccess?.();
        window.location.href = "/"; // using href to force reload
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error("💥 Login error:", err.message);
      setType("error");
      setMessage("⚠️ Could not connect. Check your internet and try again.");
      setLoading(false);
    }
  };

  return (
    <>
      {loading && 
       <Loading message={loadingMessage}/>
      }

      <FormMessage
        type={type}
        message={message}
        onClose={() => setMessage("")}
      />

      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />
          <button type="submit" className="btn-slide">
            <p>Login</p>
          </button>
          <p className="link" onClick={() => navigate("/register")}>
            Don’t have an account? Register
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
