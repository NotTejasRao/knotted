const mongoose = require('mongoose');

const Goal = require('./Goal');

const HabitSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    goals: [Goal]
});

module.exports = Habit = mongoose.mongo.model('user', HabitSchema);