const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        min : 6,
        max: 255
    },
    classroomCapacity:{
        type : String,
        required: true,
    },
    students:{
        type: Array,
        defauls: [],
    },
    resources :{
        type: Array,
        defauls: [],
    },
    createdBy: {
        type : String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('classroom', classroomSchema);
