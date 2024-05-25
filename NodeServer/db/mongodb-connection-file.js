const mongoose = require('mongoose');

const uri = "mongodb+srv://Ahmed:20776081aa@cv-analyser.tuqfwzh.mongodb.net/CV-Analyser?retryWrites=true&w=majority&appName=CV-Analyser";

async function run() {
mongoose.connect(uri)
.then(() => console.log("MongoDB connected..."))
.catch(err => console.log("MongoDB connection error:", err.message));

}


module.exports= {run}