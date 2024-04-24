const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');

const app = express();
const PORT = 6000; // Changed port number to 6000

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/upload/material', upload.single('image'), (req, res) => {
  sharp(req.file.buffer)
    .resize(500)
    .toBuffer()
    .then(data => {
      // Save or process image data
      const imageUrl = 'path/to/uploaded/image';
      res.json({ imageUrl });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error uploading material image' });
    });
});

app.post('/api/upload/customer', upload.single('image'), (req, res) => {
  sharp(req.file.buffer)
    .resize(500)
    .toBuffer()
    .then(data => {
      // Save or process image data
      const imageUrl = 'path/to/uploaded/image';
      res.json({ imageUrl });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error uploading customer image' });
    });
});

app.post('/api/combine-images', (req, res) => {
  const { materialImage, customerImage } = req.body;
  
  // Combine images logic
  const combinedImageUrl = 'path/to/combined/image';

  res.json({ imageUrl: combinedImageUrl });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
