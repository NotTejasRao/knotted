const express = require("express");
const router = express.Router();
const authenticator = require("../../middleware/authenticator");
const { check, validationResult } = require("express-validator");

const Goal = require("../../models/Goal");
const Habit = require("../../models/Habit");

/**
 * @route GET api/goals
 * @description Get goals
 * @access Public
 */
router.get("/", authenticator, async (req, res) => {
  try {
    goals = await Goal.find({ owner: req.user.id });
    return res.json(goals);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error.");
  }
});

/**
 * @route GET api/goals/:id
 * @description Get goal
 * @access Public
 */
router.get("/:id", authenticator, async (req, res) => {
  try {
    goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ errors: [{ msg: "Goal not found." }] });
    }

    if (goal.owner.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: "Permission denied." }] });
    }

    return res.json(goal);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Goal not found." }] });
    }
    console.error(err.message);
    return res.status(500).send("Server error.");
  }
});

/**
 * @route POST api/goals
 * @description Create goal
 * @access Public
 */
router.post(
  "/",
  [authenticator, [check("name", "Name is required.").not().isEmpty()]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const goal = new Goal({
        owner: req.user.id,
        name: req.body.name,
        description: req.body.description,
      });

      await goal.save();

      return res.status(200).json({ msg: "Goal created." });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error.");
    }
  }
);

/**
 * @route DELETE api/goals/:id
 * @description Delete goal
 * @access Public
 */
router.delete("/:id", authenticator, async (req, res) => {
  try {
    goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ errors: [{ msg: "Goal not found." }] });
    }

    if (goal.owner.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: "Permission denied." }] });
    }

    goal.habits.foreach(async (habit) => {
      await habit.goals.remove(goal.id);
      await habit.save();
    });

    await goal.delete();

    return res.status(200).json({ msg: "Goal deleted." });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error.");
  }
});

/**
 * @route POST api/goals/:id/habits
 * @description Add habit to goal
 * @access Public
 */
router.post(
  "/:id/habits",
  [authenticator, [check("habit_id", "Habit is required.").not().isEmpty()]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      goal = await Goal.findById(req.params.id);

      if (!goal) {
        return res.status(404).json({ errors: [{ msg: "Goal not found." }] });
      }

      if (goal.owner.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Permission denied." }] });
      }

      habit = await Habit.findOne({ _id: req.body.habit_id });

      if (!habit) {
        return res.status(400).json({ errors: [{ msg: "Habit not found." }] });
      }

      goal.habits.push(habit.id);
      habit.goals.push(goal.id);

      await habit.save();
      await goal.save();

      return res.status(200).json({ msg: "Habit saved." });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error.");
    }
  }
);

/**
 * @route DELETE api/goals/:id/habits
 * @description Delete habit from goal
 * @access Public
 */
router.delete(
  "/:id/habits",
  [authenticator, [check("habit_id", "Habit is required.").not().isEmpty()]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      goal = await Goal.findById(req.params.id);

      if (!goal) {
        return res.status(404).json({ errors: [{ msg: "Goal not found." }] });
      }

      if (goal.owner.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Permission denied." }] });
      }

      habit = Habit.findOne({ _id: req.body.habit_id });

      if (!habit) {
        return res.status(400).json({ errors: [{ msg: "Habit not found." }] });
      }

      goal.habits.remove(habit.id);
      habit.goals.remove(goal.id);

      await habit.save();
      await goal.save();

      return res.status(200).json({ msg: "Habit saved." });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error.");
    }
  }
);

module.exports = router;
