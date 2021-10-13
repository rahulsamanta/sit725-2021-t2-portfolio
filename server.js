require('dotenv').config();
const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const {
    PORT,
    SESSION_SECRET
} = process.env;
const db = require('./mongodbConnect');

const app = express();

// Checks if express is working
app.get('/test', function (req, res) {
    console.log('This is a sample test text!')
    res.send('Express is working!')
})

app.use(express.static(__dirname + '/public/'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// EJS template engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Middleware
// Express session initialization
app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: true
}));

// Socket
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Empty array to store user information in realtime
let users = [];

// Socket connection
io.on('connection', (socket) => {

    // User has joined the chatroom
    socket.on('join-room', (userData) => {
        const userInfo = {
            id: socket.id,
            username: userData.username,
            room: userData.room
        }
        users.push(userInfo)

        // Join the default chatroom
        socket.join(userData.room)

        // Notify already connected users in the room about the new user
        socket.broadcast.to(userData.room).emit('new-user', userData.username)

        // 
        io.to(userData.room).emit('current-room', userData.room)

        // List of all connected people
        var online_people = users.filter((user) => user.room === userData.room)
        io.to(userData.room).emit('online-people-list', online_people)
    })

    // Notify already connected users in the room about the new user
    socket.on('send-chat', (chat) => {
        const user = users.find((user) => user.id === socket.id)
        socket.broadcast.to(user.room).emit('receive-chat', {
            username: user.username,
            chat: chat
        })
    })

    socket.on('disconnect', () => {

        // Removing disconnected users from the list of online users
        var user = users.find(user => user.id === socket.id)

        for (var i = 0; i < users.length; i++) {
            if (users[i] === user) {
                users.splice(i, 1)
            }
        }

        if (user) {
            // Inform other connected users that one of the users have left the chatroom
            socket.broadcast.to(user.room).emit('leave', user.username)

            // Update the list of connected users
            var online_people = users.filter((person) => person.room === user.room)
            io.to(user.room).emit('online-people-list', online_people)
        }
    })

    // Check If connected users are typing
    socket.on('typing', (keypress) => {
        const user = users.find((user) => user.id === socket.id)

        // When keypress is true, show typing user's name else don't show anything
        if (keypress == true) {
            socket.broadcast.to(user.room).emit('Someone-typing', user.username)
        } else {
            socket.broadcast.to(user.room).emit('nobody-typing')
        }
    })
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/', require('./routes/chat.js'));

const port = PORT || 5000;

http.listen(port, () => {
    console.log("Listening on port ", port);
});