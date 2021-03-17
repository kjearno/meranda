const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
const urljoin = require("url-join");
const { AppError } = require("@lib/errors");
const { getResourceName } = require("@lib/utils");
const getHostUrl = require("./getHostUrl");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedFormats = ["jpeg", "png"];
  const uploadedFormat = file.mimetype.split("/")[1];

  if (!allowedFormats.includes(uploadedFormat)) {
    return cb(
      new AppError(400, "Not an image! Please upload only images"),
      false
    );
  }

  return cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1000000,
  },
});

const multerHandler = upload.single("photo");

const photoHandler = ({ width, height }) => async (req, res, next) => {
  if (req.body.photo) {
    req.body.photo = null;
    return next();
  }

  if (!req.file) {
    req.body.photo = undefined;
    return next();
  }

  const file = req.file.buffer;

  const resource = getResourceName(req);
  const photoName = `/uploads/${resource}/photos/${Date.now()}.jpg`;

  await sharp(file)
    .resize({ width, height })
    .toFormat("jpg")
    .toFile(path.join("public", photoName));

  const hostUrl = getHostUrl(req);

  req.body.photo = urljoin(hostUrl, photoName);

  return next();
};

module.exports = (options) => [multerHandler, photoHandler(options)];
