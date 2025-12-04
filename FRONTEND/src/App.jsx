import React, { useState } from "react";
import Login from "./components/Login.jsx";
import MemberDashboard from "./components/MemberDashboard.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";

function App() {
  const [user, setUser] = useState(null); // {id, username, role}

  const handleLogout = () => setUser(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "1rem" }}>
        <h1>Danawe Fitness</h1>
        <p>
          Logged in as {user.username} ({user.role})
        </p>
        <button onClick={handleLogout}>Logout</button>
      </header>

      {user.role === "admin" ? (
        <AdminDashboard user={user} />
      ) : (
        <MemberDashboard user={user} />
      )}
    </div>
  );
}

export default App;
