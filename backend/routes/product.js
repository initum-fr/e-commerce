// import express
const express = require('express');

// import router module
const router = express.Router();

const auth = require('../middleware/auth');

const productCtrl = require('../controllers/product');

router.get('/', productCtrl.getAllProducts);
router.get('/:id', productCtrl.getOneProduct);
router.post('/', auth, productCtrl.createProduct);
router.delete('/:id', auth, productCtrl.deleteProduct);


module.exports = router;