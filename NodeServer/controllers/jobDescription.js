const JobDescription = require('../models/JobDescription');
const path = require('path');

const addJobDescription = async (req, res) => {
    try {
        
        const file = req.file;

        console.log(file)
        
        const filePath = path.join('uploads/Job descriptions', file.filename);

        const newJobDescription = new JobDescription({
            userId : req.user.id,
            filePath,
        });

        const savedJobDescription = await newJobDescription.save();
        res.status(201).json(savedJobDescription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports= {addJobDescription}