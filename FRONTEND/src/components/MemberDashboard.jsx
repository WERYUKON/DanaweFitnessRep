import React, { useEffect, useState } from "react";
import { api } from "../api.js";

export default function MemberDashboard({ user }) {
  const [classes, setClasses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [workoutForm, setWorkoutForm] = useState({
    date: "",
    type: "",
    duration: "",
    notes: ""
  });
  const [error, setError] = useState("");

  async function loadAll() {
    try {
      const [cls, bks, wos] = await Promise.all([
        api("/classes"),
        api(`/members/${user.id}/bookings`),
        api(`/members/${user.id}/workouts`)
      ]);
      setClasses(cls);
      setBookings(bks);
      setWorkouts(wos);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function bookClass(classId) {
    setError("");
    try {
      await api(`/classes/${classId}/book`, {
        method: "POST",
        body: { memberId: user.id }
      });
      loadAll();
    } catch (err) {
      setError(err.message);
    }
  }

  async function cancelBooking(bookingId) {
    setError("");
    try {
      await api(`/bookings/${bookingId}`, {
        method: "DELETE",
        body: { memberId: user.id }
      });
      loadAll();
    } catch (err) {
      setError(err.message);
    }
  }

  async function saveWorkout(e) {
    e.preventDefault();
    setError("");
    try {
      await api("/workouts", {
        method: "POST",
        body: { ...workoutForm, memberId: user.id }
      });
      setWorkoutForm({ date: "", type: "", duration: "", notes: "" });
      loadAll();
    } catch (err) {
      setError(err.message);
    }
  }

  const bookedClassIds = new Set(bookings.map(b => b.classId));

  return (
    <div>
      <h2>Member Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <section>
        <h3>Available Classes</h3>
        {classes.length === 0 ? (
          <p>No classes available yet.</p>
        ) : (
          <ul>
            {classes.map(c => {
              const isFull = c.booked >= c.capacity;
              const isBooked = bookedClassIds.has(c.id);
              return (
                <li key={c.id}>
                  {c.name} – {c.date} {c.time} – {c.booked}/{c.capacity}
                  <button
                    style={{ marginLeft: "0.5rem" }}
                    disabled={isFull || isBooked}
                    onClick={() => bookClass(c.id)}
                  >
                    {isBooked ? "Already booked" : isFull ? "Full" : "Book"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h3>My Bookings</h3>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <ul>
            {bookings.map(b => (
              <li key={b.id}>
                {b.class
                  ? `${b.class.name} – ${b.class.date} ${b.class.time}`
                  : `Class ${b.classId}`}
                <button
                  style={{ marginLeft: "0.5rem" }}
                  onClick={() => cancelBooking(b.id)}
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h3>Log Workout</h3>
        <form onSubmit={saveWorkout}>
          <input
            type="date"
            value={workoutForm.date}
            onChange={e =>
              setWorkoutForm({ ...workoutForm, date: e.target.value })
            }
            required
          />
          <input
            placeholder="Type (e.g. Chest, Cardio)"
            value={workoutForm.type}
            onChange={e =>
              setWorkoutForm({ ...workoutForm, type: e.target.value })
            }
            required
          />
          <input
            type="number"
            min="1"
            placeholder="Duration (minutes)"
            value={workoutForm.duration}
            onChange={e =>
              setWorkoutForm({ ...workoutForm, duration: e.target.value })
            }
            required
          />
          <input
            placeholder="Notes (optional)"
            value={workoutForm.notes}
            onChange={e =>
              setWorkoutForm({ ...workoutForm, notes: e.target.value })
            }
          />
          <button type="submit">Save Workout</button>
        </form>
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h3>Workout History</h3>
        {workouts.length === 0 ? (
          <p>No workouts logged yet.</p>
        ) : (
          <ul>
            {workouts.map(w => (
              <li key={w.id}>
                {w.date} – {w.type} – {w.duration} min{" "}
                {w.notes && `(${w.notes})`}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
