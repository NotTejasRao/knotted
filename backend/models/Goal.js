const mongoose = require("mongoose");

const Habit = require("./Habit");

const GoalSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  habits: [{ type: mongoose.Schema.Types.ObjectId, ref: "habit" }],
});

module.exports = Goal = mongoose.model("goal", GoalSchema);
