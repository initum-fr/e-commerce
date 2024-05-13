// import express
const express = require('express');

// import router module
const router = express.Router();

const auth = require('../middleware/auth');

const productCtrl = require('../controllers/product');

router.get('/', productCtrl.getAllProducts);
router.get('/:id', productCtrl.getOneProduct);
router.post('/', auth.admin, productCtrl.createProduct);
router.put('/:id', auth.admin, productCtrl.updateProduct);
router.delete('/:id', auth.admin, productCtrl.deleteProduct);


module.exports = router;