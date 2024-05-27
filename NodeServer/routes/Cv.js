const express = require('express');
const cvController = require("../controllers/Cv");
const router = express.Router();
const {authenticate} = require('../middlewares/auth')
const {uploadFile} = require('../middlewares/upload')

router.post('/add', authenticate, uploadFile, cvController.addCV);

module.exports = router;