const mongoose = require('mongoose');

const jobDescriptionSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
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