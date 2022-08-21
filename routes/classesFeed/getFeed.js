const classroomModel = require('../../model/classroom');
const student = require('../../model/student');

exports.classesFeed = async (req, res) => {

    //checkin if user is not student
    if (req.user.userType == "student") {
        const classroom = classroomModel.find({ students: { $eq: req.user.email } })
            .then(classroom => {
                if (classroom.length == 0) {
                    return res.status(400).send("No classroom found");
                }
                res.send(classroom);
            }).catch(err => {
                res.status(400).send({
                    message: err.message || "Some error occurred while retrieving notes."
                });
            });
    }
    else if (req.user.userType == "teacher") {
        const classroom = classroomModel.find({ createdBy: req.user.email })
            .then(classroom => {
                if (classroom.length == 0) {
                    return res.status(400).send("No classroom found");
                }
                res.send(classroom);
            }).catch(err => {
                res.status(400).send({
                    message: err.message || "Some error occurred while retrieving notes."
                });
            });
    }
    else {
        return res.status(400).send("Undefined user");
    }

};

exports.filesFeed = async (req, res) => {

    const classroom = classroomModel.find({name: req.body.classroomName})
        .then(classroom => {
            if (classroom.length==0) {
                return res.status(400).send("No classroom found");
            }
            else if(classroom[0].resources.length == 0){
                return res.status(400).send("No files uploaded");
            }
            if(req.body.fileType=="all"){
                return res.send(classroom[0].resources);
            }            
            var filteredResource=[]
            classroom[0].resources.forEach((resource) => {
                if(resource.mimetype.substring(0,Math.min(req.body.fileType.length,resource.mimetype.length))==req.body.fileType){
                    filteredResource.push(resource);
                }
            });
            if(filteredResource.length==0){
                return res.status(400).send("File not found");
            }
            res.send(filteredResource);
        }).catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

exports.filesFeedSearchByName = async (req, res) => {

    const classroom = classroomModel.find({name: req.body.classroomName})
        .then(classroom => {
            if (classroom.length==0) {
                return res.status(400).send("No classroom found");
            }
            else if(classroom[0].resources.length == 0){
                return res.status(400).send("No files uploaded");
            }
            var filteredResource=[]
            classroom[0].resources.forEach((resource) => {
                if(resource.originalname==req.body.fileName){
                    filteredResource.push(resource);
                }
            });
            if(filteredResource.length==0){
                return res.status(400).send("File not found");
            }
            res.send(filteredResource);
        }).catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// audio 
// image
// application
// video