const express = require('express');
const router = express.Router();
const { getStudent, getAllStudent, createStudent, deleteStudent, updateStudent } = require('../controller/StudentController');

router.get('/get/:email', getStudent);
router.get('/getall', getAllStudent);
router.post('/create', createStudent);
router.get('/delete/:email', deleteStudent);
router.get('/update', updateStudent);

module.exports = router;