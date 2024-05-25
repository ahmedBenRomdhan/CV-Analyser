const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema(
    {
        userId:{
            type:Integer,
            required: true,
            unique:true
        },
        filePath: {
            type: String,
            required: true,
        },
        extractedText: {
            type: String,
        },
        processedData: {
            type: String,
        }
    }, { timestamps: true }
)

  
const CV = mongoose.model('CV', cvSchema);
  
module.exports = CV;