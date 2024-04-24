const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/', // Save images to 'uploads' folder
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Set file size limit to 10MB
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('image'); // 'image' is the name attribute of the file input in the frontend

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check the file extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check the MIME type
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}

// Upload endpoint for material and customer images
app.post('/api/upload/:type', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      if (req.file === undefined) {
        res.status(400).json({ error: 'No File Selected' });
      } else {
        const imageUrl = `/uploads/${req.file.filename}`;
        res.status(200).json({ imageUrl: imageUrl });
      }
    }
  });
});

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;