// import express
const express = require('express');

// import router module
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('', userCtrl.createUser);

module.exports = router;