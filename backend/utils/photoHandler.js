const multer = require('multer');
const AppError = require('./AppError');

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const allowedFormats = ['jpeg', 'png'];
  const uploadedFormat = file.mimetype.split('/')[1];

  if (!allowedFormats.includes(uploadedFormat)) {
    return cb(
      new AppError('Not an image! Please upload only images', 400),
      false
    );
  }

  return cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1000000
  }
});

exports.handlePhoto = upload.single('photo');
