const router = require('express').Router();
const classroomModel = require('../model/classroom');
const teacher = require('../model/teacher');
const student = require('../model/student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { classroomValidation, assignClassroomValidation } = require('../validation.js')
const verify = require('../verifyToken');
const getAllClassroom = require('./classroomOperations/getAllClassroom');
const updateClassroom = require('./classroomOperations/updateClassroom');
const deleteClassroom = require('./classroomOperations/deleteClassroom');
const {storeFile} = require('../uploadFile');
const multer = require("multer");
const fs = require("fs");
const fileToClassroom = require('./classroomOperations/fileToClassroom');

//add Classroom
router.post('/add',verify, async (req,res)=>{

    if(req.user.userType=="student") return res.status(400).send("Access Denied");
    // validate data
    const {error} = classroomValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the classroom already exist
    var classroom =  await classroomModel.findOne({name: req.body.name});

    if(classroom) return res.status(400).send("classroom is already added");

    classroom= new classroomModel({
        name: req.body.name,
        classroomCapacity: req.body.classroomCapacity,
        createdBy: req.user.email,
    });

    try{
        const savedClassroom= await classroom.save(); 
        res.send({message: "Success", name: classroom.name});
    }catch(err){
        res.status(400).send(err);
    }
});


//add student to  Classroom
router.post('/assign',verify, async (req,res)=>{
    //TODO check if user exist 

    if(req.user.userType=="student") return res.status(400).send("Access Denied");

    // validate data
    const {error} = assignClassroomValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the classroom already exist
    var classroom =  await classroomModel.find({name: req.body.name});
    var checkStudentIsAssied=classroom[0].students.includes(req.body.studentEmail);
    if(checkStudentIsAssied) return res.status(400).send("Student is already added in classroom");

    //Checking if the student exist or not
    var studentEmailExist =  await student.findOne({email: req.body.studentEmail});

    if(!studentEmailExist) return res.status(400).send("Student not found");

    if(classroom[0].students.length>=parseInt(classroom[0].classroomCapacity)) return res.status(400).send("Classroom Capacity full");

    const query = { name: req.body.name };
    const updateDocument = {
      $push: { students: req.body.studentEmail}
    };

    const updatedClassroom = await classroomModel.updateOne(query, updateDocument);

    try{
        res.send({message: "Success student assigned", name: updatedClassroom.name, students:updatedClassroom.students});
    }catch(err){
        res.status(400).send(err);
    }
});

// Retrieve all Notes
router.get('/classrooms',verify, getAllClassroom.findAll);


// Update a Note with noteId
router.post('/update', verify, updateClassroom.update);


// Delete a Note with noteId
router.delete('/delete', verify, deleteClassroom.delete);

const upload = multer({ storeFile });

router.post("/file/upload", verify ,upload.single("file"), fileToClassroom.uploadFile );

router.delete("/file/delete", verify , fileToClassroom.delete);

router.post("/file/update", verify ,upload.single("file"), fileToClassroom.update);

router.post("/file/rename", verify , fileToClassroom.rename);

module.exports = router;
