const express = require('express');
const connectDB = require('./config/db');

// Create Application
const app = express();

// Create Database Connection
connectDB();

// Configure Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

// Start Web Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});