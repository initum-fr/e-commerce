// import express
const express = require('express');

// import router module
const router = express.Router();

const productCtrl = require('../controllers/product');

router.post('/', productCtrl.createProduct);

module.exports = router;