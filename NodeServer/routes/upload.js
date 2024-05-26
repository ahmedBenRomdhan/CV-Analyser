const express = require('express');
const fileController = require("../controllers/upload");
const router = express.Router();

router.post("/uploadfile", fileController.upload);

module.exports = router;