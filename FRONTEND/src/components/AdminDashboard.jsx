import React, { useEffect, useState } from "react";
import { api } from "../api.js";

export default function AdminDashboard({ user }) {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    capacity: 10
  });
  const [error, setError] = useState("");

  async function loadClasses() {
    try {
      const data = await api("/classes");
      setClasses(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadClasses();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setError("");
    try {
      await api("/classes", {
        method: "POST",
        body: { ...form, adminId: user.id }
      });
      setForm({ name: "", date: "", time: "", capacity: 10 });
      loadClasses();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await api(`/classes/${id}`, {
        method: "DELETE",
        body: { adminId: user.id }
      });
      loadClasses();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <section>
        <h3>Create Class</h3>
        <form onSubmit={handleCreate}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            required
          />
          <input
            type="time"
            value={form.time}
            onChange={e => setForm({ ...form, time: e.target.value })}
            required
          />
          <input
            type="number"
            min="1"
            value={form.capacity}
            onChange={e =>
              setForm({ ...form, capacity: Number(e.target.value) })
            }
            required
          />
          <button type="submit">Create</button>
        </form>
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h3>All Classes</h3>
        {classes.length === 0 ? (
          <p>No classes yet.</p>
        ) : (
          <ul>
            {classes.map(c => (
              <li key={c.id}>
                {c.name} – {c.date} {c.time} – {c.booked}/{c.capacity} booked
                <button
                  style={{ marginLeft: "0.5rem" }}
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
