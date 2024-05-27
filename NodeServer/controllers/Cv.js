const CV = require('../models/CV');
const path = require('path');

const addCV = async (req, res) => {
    try {
        const { extractedText, processedData } = req.body;
        console.log(req.user.id)
        const file = req.file;

        console.log(file)
        
        const filePath = path.join('uploads/Cvs', file.filename);

        const newCV = new CV({
            userId : req.user.id,
            filePath,
            extractedText,
            processedData,
        });

        const savedCV = await newCV.save();
        res.status(201).json(savedCV);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports= {addCV}