require('dotenv').config();
const express = require('express');
const db = require('./mongodbConnect');

// const { MongoClient } = require('mongodb');

const app = express();
const PORT= process.env.PORT || 5000;

// Making all files under public directory available to project
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Checks if express is working
app.get('/test',function(req, res){
    console.log('This is a sample test text!')
    res.send('Express is working!')
})

// start the server and listen on port 3000
app.listen(PORT)
console.log('Server started at http://localhost:' + PORT);
