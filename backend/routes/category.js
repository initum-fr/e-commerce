const express = require("express");

const router = express.Router();

const categoryCtrl = require("../controllers/category");

router.post("/", categoryCtrl.createCategory);
router.get("/", categoryCtrl.getAllCategories);
router.get("/:id", categoryCtrl.getOneCategory);
router.put("/:id", categoryCtrl.updateCategory);
router.delete("/:id", categoryCtrl.deleteCategory);

module.exports = router;
