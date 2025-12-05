const express = require("express");
const router = express.Router();
// dummy data
let workouts = [
  { id: 1, userId: 101, exerciseName: "Push-ups", duration: 30, calories: 50 },
  { id: 2, userId: 102, exerciseName: "Running", duration: 45, calories: 300 }
];

router.get("/", (req, res) => {
  res.json(workouts);
});

router.post("/add", (req, res) => {
  const { userId, exerciseName, duration, calories } = req.body;


  if (!userId || !exerciseName || !duration || !calories) {
    return res.status(400).json({
      message: "Missing required fields"
    });
  }

  const newWorkout = {
    id: Date.now(),
    userId,
    exerciseName,
    duration,
    calories
  };

  workouts.push(newWorkout);

  res.status(201).json({
    message: "Workout added successfully",
    workout: newWorkout
  });
});

module.exports = router;
