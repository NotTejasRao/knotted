const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const authenticator = require("../../middleware/authenticator");
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");
const Goal = require("../../models/Goal");
const Habit = require("../../models/Habit");

/**
 * @route POST api/users
 * @description Register user
 * @access Public
 */
router.get(
  "/",
  [
    check("email", "Please enter a valid email.").not().isEmail(),
    check(
      "password",
      "Please enter a password containing 6 or more characters."
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists." }] });
      }

      // Create user
      user = new User({
        email,
        password,
      });

      // Encrpyt password
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);

      // Save user
      await user.save();

      // Create Payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Return JWT
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 1 * 60 * 60 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error.");
    }
  }
);

router.delete("/", authenticator, async (req, res) => {
  try {
    // Delete User Goals
    await Goal.deleteMany({ owner: req.user.id });

    // Delete User Habits
    await Habit.deleteMany({ owner: req.user.id });

    // Delete User
    await User.findOneAndRemove({ _id: req.user.id });

    return res.json({ msg: "User deleted." });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error.");
  }
});

module.exports = router;
