// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Ahmed:20776081aa@cv-analyser.tuqfwzh.mongodb.net/?retryWrites=true&w=majority&appName=CV-Analyser";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } catch(e){
//     console.log(e.message)
//   } 
//   finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

const mongoose = require('mongoose');

const uri = "mongodb+srv://Ahmed:20776081aa@cv-analyser.tuqfwzh.mongodb.net/CV-Analyser?retryWrites=true&w=majority&appName=CV-Analyser";

async function run() {
mongoose.connect(uri)
.then(() => console.log("MongoDB connected..."))
.catch(err => console.log("MongoDB connection error:", err.message));

}


module.exports= {run}