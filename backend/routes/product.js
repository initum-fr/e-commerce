// import express
const express = require("express");

// import router module
const router = express.Router();

const productCtrl = require("../controllers/product");

const auth = require("../middleware/auth");

router.get("/", productCtrl.getAllProducts);
router.get("/:id", productCtrl.getOneProduct);
router.post("/", auth, productCtrl.createProduct);
router.put("/:id", auth, productCtrl.updateProduct);
router.delete("/:id", auth, productCtrl.deleteProduct);

module.exports = router;
