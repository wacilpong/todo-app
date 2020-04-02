const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, resolve) => {
    resolve(null, `${path.join(__dirname, "..", "db/")}`);
  },
  filename: (req, file, resolve) => {
    const [, extension] = file.originalname.split(".");

    if (extension === "db") resolve(null, "source.db");
    else resolve(null, file.originalname);
  }
});

const upload = multer({ storage });

module.exports = upload;
