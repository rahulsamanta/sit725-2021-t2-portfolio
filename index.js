const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express()
const PORT=3000;

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
async function database(){
    
    const uri = "mongodb+srv://admin:SVJ2iux5XUZG7Xak@sit725-cluster.lm2gt.mongodb.net/portfolio?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Database connection successful!");

        // Insert a single record into database collection
        await insertRecord(client,
            {
                name: "Rahul Samanta",
                description: "Software Developer",
                projects: 3
            }
        );

        console.log("Record insertion completed!");
        
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

database().catch(console.error);

// Inserting single entry into database collection
async function insertRecord(client, newRecord){
    const result = await client.db("portfolio").collection("selfDetails").insertOne(newRecord);
    console.log(`New record created with the following id: ${result.insertedId}`);
}
