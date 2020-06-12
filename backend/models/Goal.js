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
  habits: [Habit],
});

module.exports = Goal = mongoose.mongo.model("user", GoalSchema);
