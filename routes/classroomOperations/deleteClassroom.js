const classroomModel = require('../../model/classroom');

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

    //checkin if user is not student
    if (req.user.userType == "student") return res.status(400).send("Access Denied");

    classroomModel.findOneAndDelete({ name: req.body.name })
        .then(classroom => {
            if (!classroom) {
                return res.status(404).send({
                    message: "Classroom not found with name " + req.body.name
                });
            }
            res.send({ message: "Classroom deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Classroom not found with name " + req.body.name
                });
            }
            return res.status(500).send({
                message: "Could not delete classroom with name " + req.body.name
            });
        });
};