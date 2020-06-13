const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const authenticator = require("../../middleware/authenticator");

const User = require("../../models/User");

/**
 * @route GET api/auth
 * @description
 * @access Public
 */
router.get("/", authenticator, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (err) {
    return res.status(500).send("Server error.");
  }
});

router.post(
  "/",
  [
    check("email", "Please enter a valid email.").not().isEmail(),
    check("password", "Password is required.").not().isEmpty(),
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
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials." }] });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials." }] });
      }

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
      res.status(500).send("Server error.");
    }
  }
);

module.exports = router;
