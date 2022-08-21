const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    userType: {
        type: String,
        default: "teacher"
    },
    classTutor: {
        type: Array,
        default: [],
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('teacher', teacherSchema);
