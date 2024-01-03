const express = require('express');
const router = express.Router();

router.use('/student', require('./StudentRouter'));
router.use('/user',require('./LoginRouter'));

module.exports = router;