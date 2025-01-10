const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerStorage');
const { postingImage, getImage } = require('../controllers/image');

router.post('/upload', upload.single('image'), postingImage);
router.get('/:id', getImage);

module.exports = router;