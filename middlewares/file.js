const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "images/");
  },
  filename(req, file, cb) {
    const date = new Date().toISOString();
    cb(null, `${date}-${file.originalname}`);
  },
});

const types = ["image/png", "image/jepg", "image/jpg"];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  filesize: 1024 * 1024 * 5,
};

module.exports = multer({ storage, limits, fileFilter });
