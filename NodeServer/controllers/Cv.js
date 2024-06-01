const CV = require("../models/CV");
const path = require("path");
const { sendMessage, getChannel } = require('../rabbitmq/rabbitmq');

const addCV = async (req, res) => {
  try {
    const { extractedText, processedData } = req.body;
    console.log(req.user.id);
    const file = req.file;
    
    console.log(file);

    const filePath = path.join("uploads/Cvs", file.filename);
    console.log(filePath)
    const newCV = new CV({
      userId: req.user.id,
      filePath,
      extractedText,
      processedData,
    });

    const savedCV = await newCV.save();
    res.status(201).json(savedCV);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
};

const getCVs = async (req, res) => {
  try {
    const cvs = await CV.find();
    res.status(200).json(cvs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const processCV = (req, res) => {
  try {
    const cvMetadata = req.body;
    console.log(cvMetadata)
    
    const queueName = "cv_processing_queue"
    sendMessage(queueName, JSON.stringify(cvMetadata));
  
    res.send({ message: 'CV processing initiated' });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = { addCV, getCVs, processCV };
