const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    const random = Math.floor(10000 + Math.random() * 90000);
    const filename = `${Date.now()}-${random}-${originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

const uploadMiddleware = upload.single("image");

module.exports = uploadMiddleware;
