const multer = require('multer');
const path = require('path');

// Set up Multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define where to store uploaded images
    cb(null, 'uploads/'); // Ensure you create an 'uploads' directory in your project
  },
  filename: (req, file, cb) => {
    // Set the filename to the original name of the file with a timestamp to prevent conflicts
    cb(null, Date.now() + path.extname(file.originalname)); // eg. 1633021872793.jpg
  }
});

// Initialize Multer upload middleware for profile and couverture photos
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    // Allow only image files
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(new Error('Only image files are allowed!'), false);
    }
  }
}).fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'covertureImage', maxCount: 1 },
  { name: 'postImage', maxCount: 1 } 
]);

// Export the upload middleware for use in routes
module.exports = { upload };
