//Validation
const Joi = require('@hapi/joi');
const values = require('@hapi/joi/lib/values');

//Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        userType: Joi.string().required().valid("student", "teacher"),
        rollNumber: Joi.string().when('userType', { is: "student", then: Joi.string().required(), otherwise: Joi.optional() }),
    });
    return schema.validate(data);
}

//login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

//classroom Validation
const classroomValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        classroomCapacity: Joi.string().max(3).pattern(/^[0-9]+$/).required(),
    });
    return schema.validate(data);
}


//assign student classroom Validation
const assignClassroomValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        studentEmail: Joi.string().required().email(),
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.classroomValidation = classroomValidation;
module.exports.assignClassroomValidation = assignClassroomValidation;