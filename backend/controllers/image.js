const Image = require('../models/image');
const fs = require('fs');
const path = require('path');

const postingImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  const image = new Image({
    name: req.file.originalname,
    contentType: req.file.mimetype,
    imageId: req.file.filename,
  });

  try {
    const savedImage = await image.save();
    savedImage.imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    await savedImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image upload failed' });
  }
};

const getImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found!' });
    }

    const imagePath = path.join(__dirname, '../uploads', image.imageId);
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: 'Image file not found!' });
    }

    res.status(200).sendFile(imagePath);
  } catch (error) {
    console.error('Get image error:', error);
    res.status(500).json({ error: 'Failed to retrieve image' });
  }
};

module.exports = { postingImage, getImage };
