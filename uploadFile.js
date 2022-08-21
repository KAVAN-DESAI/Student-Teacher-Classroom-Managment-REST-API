const multer = require("multer");
const fileSystem = require("fs");

const storeFile = multer.diskStorage({
  destination: (req, file, callback) => {
    const localDir = "uploads/";
    !fileSystem.existsSync(localDir) && fileSystem.mkdirSync(localDir);
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let fileExtension = file.originalname.lastIndexOf(".");
    fileExtension = file.originalname.substr(fileExtension + 1);
    callback(null, `${file.fieldname}-${suffix}.${fileExtension}`);
  },
});