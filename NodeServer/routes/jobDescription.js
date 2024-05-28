const express = require('express');
const jobDescriptionController = require("../controllers/jobDescription");
const router = express.Router();
const {authenticate} = require('../middlewares/auth')
const {uploadJob} = require('../middlewares/upload')

router.post('/add', authenticate, uploadJob, jobDescriptionController.addJobDescription);

router.get('/get', authenticate, jobDescriptionController.getJobDescriptions)

module.exports = router;