import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// --- Multer Configuration ---
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // This tells multer to save files into the 'uploads' directory
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    // This creates a unique filename to prevent files with the same name from overwriting each other
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// --- Validation Function ---
function checkFileType(file, cb) {
  // Define the allowed file extensions
  const filetypes = /jpeg|jpg|png/;
  // Check if the file's extension matches the allowed types
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check the file's mime type
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    // If both checks pass, allow the upload
    return cb(null, true);
  } else {
    // If either check fails, reject the upload with an error message
    cb(new Error('Images only! (jpeg, jpg, png)'), false);
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
// --- End Multer Configuration ---


// --- The Upload Route ---
// This route expects a single file in a field named 'image'
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'Please upload a file' });
  }

  // If the upload is successful, multer adds a 'file' object to the request.
  // We send back the server path to this new file.
  res.status(200).send({
    message: 'Image uploaded successfully',
    // We format the path to be a valid URL (e.g., /uploads/image-12345.jpg)
    image: `/${req.file.path.replace(/\\/g, "/")}`, 
  });
});

export default router;