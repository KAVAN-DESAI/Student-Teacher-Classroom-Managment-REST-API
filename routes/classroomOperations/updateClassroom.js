const classroomModel = require('../../model/classroom');

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    //checkin if user is not student
    if(req.user.userType=="student") return res.status(400).send("Access Denied");

    // Find classroom byy name and update it with the request body
    classroomModel.findOneAndUpdate({name : req.body.name}, {
        name: req.body.name,
        classroomCapacity: req.body.classroomCapacity
    }, {new: true})
    .then(classroom => {
        if(!classroom) {
            return res.status(404).send({
                message: "Classroom not found with name " + req.body.name
            });
        }
        res.send(classroom);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Classroom not found with name " + req.body.name
            });                
        }
        return res.status(500).send({
            message: "Error updating classroom with name " + req.body.name
        });
    });
};