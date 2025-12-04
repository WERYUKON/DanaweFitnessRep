const express = require("express");
const router = express.Router();

 
let memberships = [
  { id: 1, userId: 101, planType: "Premium", startDate: "2025-01-01", endDate: "2025-12-31" },
  { id: 2, userId: 102, planType: "Basic", startDate: "2025-02-01", endDate: "2025-05-01" }
];


router.get("/", (req, res) => {
  res.json(memberships);
});


router.post("/add", (req, res) => {
  const { userId, planType, startDate, endDate } = req.body;
  if (!userId || ! planType || !startDate || ! endDate) {
    return res.status(400).json({
      message: "Missing required fields"
    });
  }

  // make a memb obj
  const newMembership = {
    id: Date.now(), userId, planType, startDate, endDate
  };

  memberships.push(newMembership);


  res.status(201).json({
    message: "Membership added successfully",
    membership: newMembership
  });
});

module.exports = router;
