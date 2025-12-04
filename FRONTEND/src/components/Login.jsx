import React, { useState } from "react";
import { api } from "../api.js";

export default function Login({ onLogin }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (mode === "register") {
        const res = await api("/auth/register", {
          method: "POST",
          body: { username, password }
        });
        onLogin(res.user);
      } else {
        const res = await api("/auth/login", {
          method: "POST",
          body: { username, password }
        });
        onLogin(res.user);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ padding: "2rem", maxWidth: 400, margin: "0 auto" }}>
      <h1>Danawe Fitness</h1>
      <h2>{mode === "login" ? "Login" : "Register"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit" style={{ marginTop: "1rem" }}>
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>

      <button
        type="button"
        style={{ marginTop: "1rem" }}
        onClick={() =>
          setMode(prev => (prev === "login" ? "register" : "login"))
        }
      >
        {mode === "login"
          ? "Need an account? Register"
          : "Already have an account? Login"}
      </button>

      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        Default admin: <strong>admin / admin123</strong>
      </p>
    </div>
  );
}
