const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const userList = document.getElementById('users');

const game = document.currentScript.getAttribute('game');
const playername = document.currentScript.getAttribute('username');
const playerId = document.currentScript.getAttribute('userID');
const { username, room} = {username: playername, room: game};

// join chatroom
socket.emit('joinRoom', {username, room});

//Get room and users
socket.on('roomUsers', (users) =>{
    console.log(users);
    outputUsers(users);
});

//Messages from the server
socket.on('message', message => {
    outputMessage(message);
    console.log(message);

    //Scroll down to show resent message
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    //get message text
    const msg = event.target.elements.msg.value;
    //emit message to server
    socket.emit('chatMessage', msg);

    //Clear input and focus input
    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();
});

//Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.setAttribute('class', 'message');
    div.innerHTML = `<p class="meta">${message.username}<span> ${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
};

function outputUsers(users){
    var listUsers = [];
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        listUsers.push(element.username);
    }
    console.log(listUsers);
    userList.innerHTML = `
        ${listUsers.map(x => `<li>${x}</li>`).join(' ')}
    `;
}