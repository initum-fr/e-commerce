// import express
const express = require('express');

// import router module
const router = express.Router();

const productCtrl = require('../controllers/product');

router.get('/', productCtrl.getAllProducts);
router.get('/:id', productCtrl.getOneProduct);
router.post('/', productCtrl.createProduct);
router.put('/:id', productCtrl.updateProduct);
router.delete('/:id', productCtrl.deleteProduct);


module.exports = router;