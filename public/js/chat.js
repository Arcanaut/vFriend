const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');


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
}