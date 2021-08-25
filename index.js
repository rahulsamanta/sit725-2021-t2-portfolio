require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
// const { MongoClient } = require('mongodb');

const app = express()
const PORT= process.env.PORT || 5000;

// Making all files under public directory available to project
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Checks if express is working
app.get('/test',function(req, res){
    console.log('This is my home page')
    res.send('Express is working!')
})

// start the server and listen on port 3000
app.listen(PORT)
console.log('Server started at http://localhost:' + PORT);

// Function to connect to MongoDB and perform operations
// async function database(){
    
//     const uri = process.env.MONGO_DB_URI;

//     const client = new MongoClient(uri);
 
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
//         console.log("Database connection successful!");
 
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// database().catch(console.error);

// Function to connect to MongoDB and perform operations
mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// Testing database connectivity
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
    console.log("Database connection successful!");
});
