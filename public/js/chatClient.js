// Initialize socket io
const socket = io();

// Initialize tooltips and modal
$(function () {
    $('.tooltipped').tooltip({
        enterDelay: 500
    });
    $('.modal').modal();
})

// Fetch username, room or publicroom from url
const url = new URL(window.location.href);
const username = url.searchParams.get('username');
const room = url.searchParams.get('room');

// User is typing
let typing = false;
let timeout = undefined;

function timeoutFunction() {
    socket.emit('typing', false);
}

document.getElementById('user-chat').addEventListener('keydown', (e) => {

    // If any other key was pressed apart from enter show a 'typing' message
    if (e.key != 'Enter') {
        socket.emit('typing', true);
        clearTimeout(timeout);
        timeout = setTimeout(timeoutFunction, 1000);
    } else {
        clearTimeout(timeout)
        timeout = setTimeout(timeoutFunction, 0);
    }
})

// Append chat to chat area in different positions
function appendchat(message, position) {
    const chatArea = document.querySelector('.chat-area-body');
    const chatElement = document.createElement('div');

    // Show message if user has joined or left the room
    if (position == 'center') {
        chatElement.classList.add('chat-join-leave');
    }

    // User sent a chat
    else if (position == 'right') {
        chatElement.classList.add('chat', 'you', position);
    }

    // User received a chat
    else {
        chatElement.classList.add('chat', position);
    }

    chatElement.innerHTML = message;
    chatArea.appendChild(chatElement);
    gotoBottom('message-body');
}

// Fetch the current time of sent chat from the client-side
function currentTime() {
    const current_time = new Date().toLocaleTimeString([], {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    return current_time;
}

// Scroll to bottom of screen automatically
function gotoBottom(id) {
    let element = document.getElementById(id);
    element.scrollTop = element.scrollHeight - element.clientHeight;
}

// User has joined the chat
socket.emit('join-room', {
    username,
    room
});

// Notify the online users when a new user has joined
socket.on('new-user', (name) => {
    appendchat(`${name} has joined the chat`, 'center');
})

// User has left the chatroom
socket.on('leave', (name) => {
    appendchat(`${name} has left the chat`, 'center');
})

// User is typing
const typingStatus = document.getElementById('typing');

socket.on('Someone-typing', (name) => {
    typingStatus.innerText = `${name} is typing..`;
})

socket.on('nobody-typing', () => {
    typingStatus.innerText = '';
})

// Room name to header
socket.on('current-room', (room) => {
    let current_room = document.getElementById('chatroom-name');
    current_room.innerText = room;
})

// List of all online people
socket.on('online-people-list', (people) => {

    //Updating the number of people online
    let usersOnline = document.getElementById('usersOnline');
    usersOnline.innerText = people.length;

    //Updating the list of people online
    let usersList = document.getElementById('usersOnlineList');
    usersList.innerHTML = `${people.map((user) => `<li class="collection-item center">${user.username}</li>`).join('')}`;
})

// Send chat when user has submitted form
const chatForm = document.querySelector('.chat-send-form');
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var chatInput = document.getElementById('user-chat');
    var chat = chatInput.value;

    // Send chat to server-side
    socket.emit('send-chat', chat);

    appendchat(`<div class="chat-head">You</div>
                    ${chat}
                <span class="chat-time">
                    ${currentTime()}
                </span>`, 'right')

    // Empty field when chat has sent
    chatInput.value = '';
})

// Receive a new chat
socket.on('receive-chat', (data) => {
    appendchat(`<div class="chat-head">${data.username}</div>
                    ${data.chat}
                <span class="chat-time">
                    ${currentTime()}
                </span>`, 'left')
})