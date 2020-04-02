const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, resolve) => {
    resolve(null, `${path.join(__dirname, "..", "db/")}`);
  },
  filename: (req, file, resolve) => {
    resolve(null, "source.db");
  }
});

const upload = multer({ storage });

module.exports = upload;
