const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contentType: { type: String, required: true },
  imageUrl: { type: String },
  imageId: String,
});

module.exports = mongoose.model('Image', imageSchema);
module.exports = upload;
