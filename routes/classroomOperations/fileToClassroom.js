const classroomModel = require('../../model/classroom');

exports.uploadFile = (async (req, res) => {

    //checkin if user is not student
    if (req.user.userType == "student") return res.status(400).send("Access Denied");

    // Find classroom byy name and update it with the request body
    const query = { name: req.body.classroomName };
    const updateDocument = {
        $push: { resources: req.file }
    };

    const updatedClassroom = await classroomModel.updateOne(query, updateDocument);

    try {
        res.send({ message: "Success resource added" });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a classroom with the specified noteId in the request
exports.delete = (req, res) => {

    //checkin if user is not student
    if (req.user.userType == "student") return res.status(400).send("Access Denied");
    console.log(req.body);

    classroomModel.findOne({ name: req.body.classroomName })
        .then(async classroom => {
            var fileIndex = classroom.resources.findIndex(x => x.originalname === req.body.fileName);
            if (fileIndex >= 0 && classroom.resources[fileIndex].originalname == req.body.fileName) {
                var file = classroom.resources.splice(fileIndex, 1);
            }
            else {
                return res.status(404).send({
                    message: "File not found with name " + req.body.fileName
                });
            }
            const savedClassroom = await classroom.save();
            res.send({ message: "File deleted successfully from class " + req.body.classroomName });
        }).catch(err => {
            console.log(err);
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "File not found with name " + req.body.fileName
                });
            }
            return res.status(400).send({
                message: "Could not delete file with name " + req.body.fileName
            });
        });
};

// Delete a classroom with the specified noteId in the request
exports.update = (req, res) => {

    //checkin if user is not student
    if (req.user.userType == "student") return res.status(400).send("Access Denied");

    classroomModel.findOne({ name: req.body.classroomName })
        .then(async classroom => {
            console.log(req);
            console.log(req.file);
            var fileIndex = classroom.resources.findIndex(x => x.originalname === req.body.updateFileName);
            if (fileIndex >= 0 && classroom.resources[fileIndex].originalname == req.body.updateFileName) {
                var file = classroom.resources.splice(fileIndex, 1, req.file);
            }
            else {
                return res.status(404).send({
                    message: "File not found with name " + req.body.updateFileName
                });
            }
            const savedClassroom = await classroom.save();
            res.send({ message: "File updated successfully in class " + req.body.classroomName });
        }).catch(err => {
            console.log(err);
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "File not found with name " + req.body.updateFileName
                });
            }
            return res.status(400).send({
                message: "Could not delete file with name " + req.body.updateFileName
            });
        });
};



// rename a file with the specified name in the request
exports.rename = async (req, res) => {

    //checkin if user is not student
    if (req.user.userType == "student") return res.status(400).send("Access Denied");

    // Find classroom byy name and update it with the request body
    const query = { name : req.body.classroomName};
    const updateDocument = {
        $set: { resources: [{originalname : {$eq : ["$originalname", req.body.fileName],then : req.body.updatedFileName} }]}
    };

    const updatedClassroom = await classroomModel.findOneAndUpdate(query, updateDocument,{upsert: true,});

    try {        
        console.log(query);
        console.log(updatedClassroom);
        res.send({ message: "File name updated successfully to " + req.body.updatedFileName });
    } catch (err) {
        res.status(400).send(err);
    }

};