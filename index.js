const express = require('express');
const path = require('path');

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