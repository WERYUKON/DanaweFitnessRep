const express = require("express");
const router = express. Router();

// dummy dtaa

let classes = [
  { id: 1, name: "Yoga", trainer: "Anna", time: "10:00 AM" },
  { id: 2, name: "HIIT", trainer: "Mike", time: "6:00 PM" }
];


router.get("/", (req, res) => {
  res.json(classes);
});

router.post("/add", (req, res) => {
  const { name, trainer, time } = req.body;

  
  if (!name || !trainer || !time) {
    return res.status(400).json({
      message: "Missing required fields"
    });
  }

  
  const newClass = {
    id: Date.now(), // uqn id
    name,
    trainer,
    time
  };

  classes.push(newClass);

  // success message
  res.status(201).json({
    message: "Class added successfully",
    class: newClass
  });
});

module.exports = router;
