const mongoose =require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        min : 6,
        max: 255
    },
    email: {
        type : String,
        required: true,
        max: 255,
        min: 6
    },
    password:{
        type : String,
        required: true,
        max:1024,
        min:6
    },
    userType: {
        type: String,
        default: "student"
    },
    rollNumber: {
        type: String,
        required: true,
    },
    classesEnrolled:{
        type: Array,
        default:[],
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('student', studentSchema);
