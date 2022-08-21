const router = require('express').Router();
const classroomModel = require('../../model/classroom');
// Retrieve and return all classroom from the database.

exports.findAll = (req, res) => {
    //checkin if user is not student
    if (req.user.userType == "student") return res.status(400).send("Access Denied");

    classroomModel.find()
        .then(classroom => {
            res.send(classroom);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};