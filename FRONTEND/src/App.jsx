import React, { useState } from "react";
import { api } from "./api";
import MemberDashboard from "./components/MemberDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [user, setUser] = useState(null); // { id, username, role }
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: ""
  });
  const [authError, setAuthError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await api("/auth/login", {
        method: "POST",
        body: loginForm
      });
      setUser(res.user);
    } catch (err) {
      setAuthError(err.message);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await api("/auth/register", {
        method: "POST",
        body: registerForm
      });
      setUser(res.user);
    } catch (err) {
      setAuthError(err.message);
    }
  }

  function handleLogout() {
    setUser(null);
    setLoginForm({ username: "", password: "" });
    setRegisterForm({ username: "", password: "" });
    setAuthError("");
  }

  const pageStyle = {
    minHeight: "110vh",
    margin: 0,
    padding: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundImage:
      "url(https://img.freepik.com/free-photo/low-angle-view-unrecognizable-muscular-build-man-preparing-lifting-barbell-health-club_637285-2497.jpg?semt=ais_hybrid&w=740&q=80)",
    backgroundSize: "cover",
    backgroundSize: "120% auto",
    backgroundPosition: "center",
    color: "#f5f5f5",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  };

  const overlayStyle = {
    width: "100%",
    maxWidth: "1100px",
    background:
      "linear-gradient(135deg, rgba(0,0,0,0.9), rgba(0,0,0,0.85), rgba(0,0,0,0.9))",
    borderRadius: "18px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.7)",
    padding: "1.5rem 2rem 2.5rem",
    backdropFilter: "blur(6px)"
  };

  const headerBarStyle = {
    width: "100%",
    padding: "1.2rem 1.5rem",
    borderRadius: "14px",
    marginBottom: "1.5rem",
    background:
      "linear-gradient(90deg, rgba(0, 185, 130, 0.85), rgba(0, 210, 170, 0.75))",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    textAlign: "center",
    letterSpacing: "0.08em"
  };

  const titleStyle = {
    margin: 0,
    fontSize: "1.8rem",
    fontWeight: 700
  };

  const authRowStyle = {
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: "0.75rem"
  };

  const cardStyle = {
    flex: "1 1 340px",
    background:
      "radial-gradient(circle at top left, #141b24, #05070a 55%, #030406 95%)",
    borderRadius: "16px",
    padding: "1.25rem 1.25rem 1.6rem",
    boxShadow: "0 14px 30px rgba(0,0,0,0.75)",
    border: "1px solid rgba(0, 255, 200, 0.09)"
  };

  const cardHeaderStyle = {
    borderLeft: "4px solid #06f0c3",
    paddingLeft: "0.6rem",
    marginBottom: "0.75rem",
    fontSize: "1.1rem",
    fontWeight: 600
  };

  const cardImageStyle = {
    width: "120%",
    height: "196px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "0.9rem",
    filter: "brightness(0.9)"
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.85rem",
    marginBottom: "0.25rem",
    color: "#aab7c4"
  };

  const inputStyle = {
    width: "100%",
    padding: "0.6rem 0.75rem",
    borderRadius: "8px",
    border: "1px solid #1b2836",
    backgroundColor: "#05070a",
    color: "#f5f5f5",
    marginBottom: "0.55rem",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.65rem 0.75rem",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.95rem",
    background:
      "linear-gradient(90deg, #00e79f, #00f5c8, #00e79f)",
    color: "#021013",
    boxShadow: "0 10px 20px rgba(0, 230, 160, 0.45)",
    transition: "transform 0.08s ease, box-shadow 0.08s ease"
  };

  const buttonHoverStyle = {
    transform: "translateY(-1px)",
    boxShadow: "0 13px 26px rgba(0, 230, 160, 0.55)"
  };

  const smallTextStyle = {
    fontSize: "0.85rem",
    marginTop: "0.4rem",
    color: "#9fb3c8"
  };

  const errorStyle = {
    color: "#ff6b81",
    marginBottom: "0.6rem",
    fontSize: "0.85rem"
  };

  const loggedBarStyle = {
    marginTop: "1.2rem",
    marginBottom: "0.9rem",
    padding: "0.85rem 1rem",
    borderRadius: "12px",
    background:
      "linear-gradient(90deg, rgba(0, 230, 160, 0.14), rgba(0,0,0,0.35))",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "0.75rem",
    fontSize: "0.9rem"
  };

  const pillButtonRowStyle = {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap"
  };

  const pillButtonStyle = {
    padding: "0.45rem 0.85rem",
    borderRadius: "999px",
    border: "none",
    fontSize: "0.85rem",
    fontWeight: 600,
    cursor: "pointer",
    background:
      "linear-gradient(90deg, #00d2ff, #00f5c8)",
    color: "#021013",
    boxShadow: "0 8px 18px rgba(0, 210, 255, 0.35)"
  };

  if (!user) {
    return (
      <div style={pageStyle}>
        <div style={overlayStyle}>
          <header style={headerBarStyle}>
            <h1 style={titleStyle}>DANAWE FITNESS MANAGEMENT SYSTEM</h1>
          </header>

          <main>
            <div style={authRowStyle}>
              {/* LOGIN CARD */}
              <section style={cardStyle}>
                <div style={cardHeaderStyle}>Login</div>

                {authError && <div style={errorStyle}>{authError}</div>}

                <form onSubmit={handleLogin}>
                  <label style={labelStyle}>Username:</label>
                  <input
                    style={inputStyle}
                    placeholder="Enter username"
                    value={loginForm.username}
                    onChange={e =>
                      setLoginForm({ ...loginForm, username: e.target.value })
                    }
                    required
                  />

                  <label style={labelStyle}>Password:</label>
                  <input
                    type="password"
                    style={inputStyle}
                    placeholder="Enter password"
                    value={loginForm.password}
                    onChange={e =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    required
                  />

                  <button
                    type="submit"
                    style={buttonStyle}
                    onMouseDown={e =>
                      Object.assign(e.currentTarget.style, buttonHoverStyle)
                    }
                    onMouseUp={e =>
                      Object.assign(e.currentTarget.style, buttonStyle)
                    }
                    onMouseLeave={e =>
                      Object.assign(e.currentTarget.style, buttonStyle)
                    }
                  >
                    Login
                  </button>
                </form>

                <p style={smallTextStyle}>
                  Admin: <strong>admin / admin123</strong>
                </p>
              </section>

              {/* REGISTER CARD */}
              <section style={cardStyle}>
                <div style={cardHeaderStyle}>Register</div>

                <form onSubmit={handleRegister}>
                  <label style={labelStyle}>Username:</label>
                  <input
                    style={inputStyle}
                    placeholder="Choose username"
                    value={registerForm.username}
                    onChange={e =>
                      setRegisterForm({
                        ...registerForm,
                        username: e.target.value
                      })
                    }
                    required
                  />

                  <label style={labelStyle}>Password:</label>
                  <input
                    type="password"
                    style={inputStyle}
                    placeholder="Choose password"
                    value={registerForm.password}
                    onChange={e =>
                      setRegisterForm({
                        ...registerForm,
                        password: e.target.value
                      })
                    }
                    required
                  />

                  <button
                    type="submit"
                    style={buttonStyle}
                    onMouseDown={e =>
                      Object.assign(e.currentTarget.style, buttonHoverStyle)
                    }
                    onMouseUp={e =>
                      Object.assign(e.currentTarget.style, buttonStyle)
                    }
                    onMouseLeave={e =>
                      Object.assign(e.currentTarget.style, buttonStyle)
                    }
                  >
                    Register
                  </button>
                </form>

                <p style={smallTextStyle}>
                  New members can create an account here to book classes and log
                  workouts.
                </p>
              </section>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={overlayStyle}>
        <header style={headerBarStyle}>
          <h1 style={titleStyle}>DANAWE FITNESS MANAGEMENT SYSTEM</h1>
        </header>

        <div style={loggedBarStyle}>
          <span>
            Logged in as: <strong>{user.username}</strong> ({user.role})
          </span>
          <div style={pillButtonRowStyle}>
            {user.role === "member" && (
              <button style={pillButtonStyle}>Member Dashboard</button>
            )}
            {user.role === "admin" && (
              <button style={pillButtonStyle}>Admin Dashboard</button>
            )}
            <button
              style={{
                ...pillButtonStyle,
                background:
                  "linear-gradient(90deg, #ff5f6d, #ffc371)",
                boxShadow: "0 8px 18px rgba(255, 95, 109, 0.45)"
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {user.role === "admin" ? (
          <AdminDashboard user={user} />
        ) : (
          <MemberDashboard user={user} />
        )}
      </div>
    </div>
  );
}

export default App;
