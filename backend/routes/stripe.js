// import express
const express = require('express');

// import router module
const router = express.Router();

const stripeCtrl = require('../controllers/stripe');

router.post('', stripeCtrl.createPaymentIntent);

module.exports = router;
