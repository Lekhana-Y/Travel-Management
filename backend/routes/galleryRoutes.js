import express from 'express';
import multer from 'multer';
import Gallery from '../models/Gallery.js';

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/gallery/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp/;
    const ext = file.mimetype.split('/')[1];
    cb(null, fileTypes.test(ext));
  }
});

// POST image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const imageUrl = `/uploads/gallery/${req.file.filename}`;

    const galleryItem = new Gallery({
      imageUrl,
    });

    await galleryItem.save();
    res.status(201).json({ message: 'Image uploaded', data: galleryItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

// GET all images
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find().sort({ uploadedAt: -1 });
    res.status(200).json({ data: images });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch images', error: err.message });
  }
});

export default router;
