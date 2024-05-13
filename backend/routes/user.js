const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');

router.get('/', auth.admin, userCtrl.getAllUsers);
router.get('/:id', auth.currentUser, userCtrl.getOneUser)
router.put('/:id', auth.currentUser, userCtrl.updateUser)
router.delete('/:id', auth.currentUser, userCtrl.deleteUser)

module.exports = router;