const router = require('express').Router();
const student = require('../model/student');
const teacher = require('../model/teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation.js')

router.post('/register', async (req, res) => {
    if (req.body.userType == "teacher") {
        // validate data
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        //Checking if the user is already exist
        const teacherEmailExist = await teacher.findOne({ email: req.body.email });

        if (teacherEmailExist) return res.status(400).send("Email already registered!");

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = new teacher({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        });
        try {
            const savedUser = await user.save();
            res.send({ user: user._id });
        } catch (err) {
            res.status(400).send(err);
        }
    }
    else if (req.body.userType == "student") {
        // validate data
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        //Checking if the user is already exist
        var studentEmailExist = await student.findOne({ email: req.body.email });

        studentEmailExist = await student.findOne({ rollNumber: req.body.rollNumber });

        if (studentEmailExist) return res.status(400).send("Student with same rollNumber or Email already registered!");
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const user = new student({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            rollNumber: req.body.rollNumber,
        });
        try {
            const savedUser = await user.save();
            res.send({ user: user._id });
        } catch (err) {
            res.status(400).send(err);
        }
    }
    else {
        return res.status(400).send("Invalid Data");
    }
});


//Login
router.post('/login', async (req, res) => {

    // validate data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already exist
    var user = await student.findOne({ email: req.body.email });
    if (!user) {
        user = await teacher.findOne({ email: req.body.email });
    }

    if (!user) return res.status(400).send("Email is wrong");

    //Check Password 
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) return res.status(400).send("Passord is wrong");

    //Create and assign a token
    const token = jwt.sign({ _id: user._id, userType: user.userType, email: req.body.email }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).send(token);
});

module.exports = router;
