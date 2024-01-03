const StudentSchema = require('../model/Student');
module.exports.getStudent = async function (req, res) {
    try {
        const Student = await StudentSchema.findOne({ email: req.params.email });
        if (Student)
            return res.status(200).send(Student);
        else
            return res.status(200).send('Student not founded');
    } catch (error) {
        return res.status(404).send(error);
    }
}

module.exports.getAllStudent = async function (req, res) {
    const Student = await StudentSchema.find();
    return res.status(200).send(Student);
}

module.exports.deleteStudent = async function (req, res) {
    try {
        const Student = await StudentSchema.findOneAndDelete({email : req.params.email});
        return res.status(501).json({
            msg: "Student deleted Successfully",
            student: Student
        })
    } catch (error) {
        return res.status(505).json({
            msg: "found error during deleting student",
            error: error
        })
    }
}

module.exports.createStudent = async function (req, res) {
    try {
        const Student = await StudentSchema.findOne({ email: req.body.email });
        if (Student)
            return res.status(200).json({
                message: "Email is already registered",
                data: Student
            });
        else {
            const StudentInfo = await StudentSchema.create(req.body);
            return res.status(200).json({
                message: "Student Created Successfully",
                data: StudentInfo
            });
        }
    } catch (error) {
        return res.status(501).json({
            message: "found error",
            errorMsg: error
        });
    }
}

module.exports.updateStudent = function (req, res) {
    return res.send('Update Student');
}