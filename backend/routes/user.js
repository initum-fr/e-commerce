const express = require("express");

const router = express.Router();

const userCtrl = require("../controllers/user");

const auth = require("../middleware/auth");

router.post("/", auth, userCtrl.createUser);
router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);
router.put("/:id", auth, userCtrl.updateUser);
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;
