import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// ===== In-memory data =====
let users = [
  { id: 1, username: "admin", password: "admin123", role: "admin" } // default admin
];
let nextUserId = 2;

let classes = [];
let nextClassId = 1;

let bookings = []; // { id, classId, memberId }
let nextBookingId = 1;

let workouts = []; // { id, memberId, date, type, duration, notes }
let nextWorkoutId = 1;

// Helper: find user by id
function getUser(id) {
  return users.find(u => u.id === id);
}

// ===== AUTH =====

// Register new member
app.post("/api/auth/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  const exists = users.some(u => u.username === username);
  if (exists)
    return res.status(400).json({ message: "Username already exists" });

  const newUser = {
    id: nextUserId++,
    username,
    password, // NOTE: plain text; OK for course, not for real production
    role: "member"
  };
  users.push(newUser);

  res.status(201).json({
    message: "Registration successful",
    user: { id: newUser.id, username: newUser.username, role: newUser.role }
  });
});

// Login
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    u => u.username === username && u.password === password
  );
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // No JWT, we just return the user; frontend will store it
  res.json({
    message: "Login successful",
    user: { id: user.id, username: user.username, role: user.role }
  });
});

// ===== CLASSES (admin + member read) =====

// Get all classes
app.get("/api/classes", (req, res) => {
  // Attach currentBooked count
  const result = classes.map(cls => {
    const booked = bookings.filter(b => b.classId === cls.id).length;
    return { ...cls, booked };
  });
  res.json(result);
});

// Create class (admin only)
app.post("/api/classes", (req, res) => {
  const { adminId, name, date, time, capacity } = req.body;

  const admin = getUser(adminId);
  if (!admin || admin.role !== "admin")
    return res.status(403).json({ message: "Only admin can create classes" });

  if (!name || !date || !time || !capacity)
    return res.status(400).json({ message: "Missing fields" });

  const newClass = {
    id: nextClassId++,
    name,
    date,
    time,
    capacity: Number(capacity)
  };
  classes.push(newClass);
  res.status(201).json(newClass);
});

// Delete class (admin only)
app.delete("/api/classes/:id", (req, res) => {
  const { adminId } = req.body;
  const admin = getUser(adminId);
  if (!admin || admin.role !== "admin")
    return res.status(403).json({ message: "Only admin can delete classes" });

  const classId = Number(req.params.id);
  classes = classes.filter(c => c.id !== classId);
  bookings = bookings.filter(b => b.classId !== classId); // remove related bookings
  res.json({ message: "Class deleted" });
});

// ===== BOOKINGS (members) =====

// Member books class
app.post("/api/classes/:id/book", (req, res) => {
  const classId = Number(req.params.id);
  const { memberId } = req.body;

  const member = getUser(memberId);
  if (!member || member.role !== "member")
    return res.status(403).json({ message: "Only members can book classes" });

  const cls = classes.find(c => c.id === classId);
  if (!cls) return res.status(404).json({ message: "Class not found" });

  const existing = bookings.find(
    b => b.classId === classId && b.memberId === memberId
  );
  if (existing)
    return res.status(400).json({ message: "You already booked this class" });

  const currentCount = bookings.filter(b => b.classId === classId).length;
  if (currentCount >= cls.capacity)
    return res.status(400).json({ message: "Class is full (overbooking prevented)" });

  const booking = { id: nextBookingId++, classId, memberId };
  bookings.push(booking);
  res.status(201).json(booking);
});

// Cancel booking
app.delete("/api/bookings/:id", (req, res) => {
  const bookingId = Number(req.params.id);
  const { memberId } = req.body;

  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  if (booking.memberId !== memberId)
    return res.status(403).json({ message: "You can only cancel your own bookings" });

  bookings = bookings.filter(b => b.id !== bookingId);
  res.json({ message: "Booking cancelled" });
});

// Get bookings for a member (with class info)
app.get("/api/members/:id/bookings", (req, res) => {
  const memberId = Number(req.params.id);
  const list = bookings
    .filter(b => b.memberId === memberId)
    .map(b => ({
      ...b,
      class: classes.find(c => c.id === b.classId) || null
    }));
  res.json(list);
});

// ===== WORKOUTS =====

// Log workout
app.post("/api/workouts", (req, res) => {
  const { memberId, date, type, duration, notes } = req.body;

  const member = getUser(memberId);
  if (!member || member.role !== "member")
    return res.status(403).json({ message: "Only members can log workouts" });

  if (!date || !type || !duration)
    return res.status(400).json({ message: "Missing fields" });

  const workout = {
    id: nextWorkoutId++,
    memberId,
    date,
    type,
    duration: Number(duration),
    notes: notes || ""
  };
  workouts.push(workout);
  res.status(201).json(workout);
});

// Get workout history for member
app.get("/api/members/:id/workouts", (req, res) => {
  const memberId = Number(req.params.id);
  const list = workouts.filter(w => w.memberId === memberId);
  res.json(list);
});

// ===== Start server =====
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
