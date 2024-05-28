const util = require("util");
const multer = require("multer");
const path = require('path');

const CvUploadsDir = path.join('/uploads/Cvs');
const JobUploadsDir = path.join('/uploads/Cvs');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, __basedir + "/uploads/Cvs"); //when running on localhost
    cb(null, __basedir + CvUploadsDir); // when running with docker
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
    // cb(null, __basedir + "/uploads/Job descriptions");  //when running on localhost
    cb(null, __basedir + JobUploadsDir); // when running with docker
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



