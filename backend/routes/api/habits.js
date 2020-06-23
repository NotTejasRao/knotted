const express = require("express");
const router = express.Router();
const authenticator = require("../../middleware/authenticator");
const { check, validationResult } = require("express-validator");

const Goal = require("../../models/Goal");
const Habit = require("../../models/Habit");

/**
 * @route GET api/habits
 * @description Get habits
 * @access Public
 */
router.get("/", authenticator, async (req, res) => {
  try {
    habits = await Habit.find({ owner: req.user.id });
    return res.json(habits);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error.");
  }
});

/**
 * @route GET api/habits/:id
 * @description Get habit
 * @access Public
 */
router.get("/:id", authenticator, async (req, res) => {
  try {
    habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ errors: [{ msg: "Habit not found." }] });
    }

    if (habit.owner.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: "Permission denied." }] });
    }

    return res.json(habit);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Habit not found." }] });
    }
    console.error(err.message);
    return res.status(500).send("Server error.");
  }
});

/**
 * @route POST api/habits
 * @description Create habit
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

      const habit = new Habit({
        owner: req.user.id,
        name: req.body.name,
      });

      await habit.save();

      return res.status(200).json({ msg: "Habit created." });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error.");
    }
  }
);

/**
 * @route DELETE api/habits/:id
 * @description Delete habit
 * @access Public
 */
router.delete("/:id", authenticator, async (req, res) => {
  try {
    habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ errors: [{ msg: "Habit not found." }] });
    }

    if (habit.owner.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: "Permission denied." }] });
    }

    habit.goals.foreach(async (goal) => {
      await goal.habits.remove(habit.id);
      await goal.save();
    });

    await habit.delete();

    return res.status(200).json({ msg: "Habit deleted." });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error.");
  }
});

/**
 * @route POST api/habits/:id/log
 * @description Log completion
 * @access Public
 */
router.post(
  "/:id/dates",
  [authenticator, [check("date", "Date is required.").isDate()]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      habit = await Habit.findById(req.params.id);

      if (!habit) {
        return res.status(404).json({ errors: [{ msg: "Habit not found." }] });
      }

      if (habit.owner.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Permission denied." }] });
      }

      date = JSON.parse(req.body.date);
      if (req.body.completed) {
        habit.dates.remove(date);
      } else {
        habit.dates.push(date);
      }

      await habit.save();
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error.");
    }
  }
);

/**
 * @route POST api/habits/:id/goals
 * @description Add goal to habit
 * @access Public
 */
router.post(
  "/:id/goals",
  [authenticator, [check("goal_id", "Goal is required.").not().isEmpty()]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      habit = await Habit.findById(req.params.id);

      if (!habit) {
        return res.status(404).json({ errors: [{ msg: "Habit not found." }] });
      }

      if (habit.owner.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Permission denied." }] });
      }

      goal = await Goal.findOne({ _id: req.body.habit_id });

      if (!goal) {
        return res.status(400).json({ errors: [{ msg: "Goal not found." }] });
      }

      habit.goals.push(goal.id);
      goal.habits.push(habit.id);

      await goal.save();
      await habit.save();

      return res.status(200).json({ msg: "Goal saved." });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error.");
    }
  }
);

/**
 * @route DELETE api/habits/:id/goals
 * @description Delete goal from habit
 * @access Public
 */
router.delete(
  "/:id/goals",
  [authenticator, [check("goal_id", "Goal is required.").not().isEmpty()]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      habit = await Habit.findById(req.params.id);

      if (!habit) {
        return res.status(404).json({ errors: [{ msg: "Habit not found." }] });
      }

      if (habit.owner.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Permission denied." }] });
      }

      goal = Goal.findOne({ _id: req.body.goal_id });

      if (!goal) {
        return res.status(400).json({ errors: [{ msg: "Goal not found." }] });
      }

      habit.goals.remove(goal.id);
      goal.habits.remove(habit.id);

      await goal.save();
      await habit.save();

      return res.status(200).json({ msg: "Goal saved." });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error.");
    }
  }
);

module.exports = router;
