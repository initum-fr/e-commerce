const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contentType: { type: String, required: true },
    imageUrl: { type: String },
    imageId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Image || mongoose.model('Image', imageSchema);
