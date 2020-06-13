const express = require("express");
const connectDB = require("./config/db");

// Create Application
const app = express();

// Create Database Connection
connectDB();

// Initialize Middleware
app.use(express.json({ extended: false }));

// Configure Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/goals", require("./routes/api/goals"));
app.use("/api/habits", require("./routes/api/habits"));

// Start Web Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
