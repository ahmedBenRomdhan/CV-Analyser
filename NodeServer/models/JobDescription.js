const mongoose = require('mongoose');

const jobDescriptionSchema = new mongoose.Schema(
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
        }
    }, { timestamps: true }
)

  
const JobDescription = mongoose.model('JobDescription', jobDescriptionSchema);
  
module.exports = JobDescription;