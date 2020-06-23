const mongoose = require("mongoose");

const Goal = require("./Goal");

const HabitSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "goal" }],
  goals: [{ type: Date }],
});

module.exports = Habit = mongoose.model("habit", HabitSchema);
