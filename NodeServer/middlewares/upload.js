const util = require("util");
const multer = require("multer");


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/Cvs");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage
}).single("file");

let jobStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/Job descriptions");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let uploadJob = multer({
  storage: jobStorage
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = {
  uploadFileMiddleware,
  uploadFile,
  uploadJob
};



