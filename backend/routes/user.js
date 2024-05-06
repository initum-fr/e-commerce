// import express
const express = require('express');

// import router module
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

module.exports = router;