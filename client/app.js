const socket = io();

// Listeners
socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('login', ({ user }) => ({ user }));
socket.on('logAlert', ({ user, status }) => addChatbotMessage(user, status));

// References
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

function addChatbotMessage(user, status) {
  const message = document.createElement('li');
  message.classList.add('message', 'message--received');
  if(status === 'connected'){
    message.innerHTML = `
      <h3 class="message__author">ChatBot</h3>
      <div class="message__content">
        <i>${user} has joined the conversation!</i>
      </div>
      `;
    messagesList.appendChild(message);
  } else if(status === 'disconnected'){
    message.innerHTML = `
      <h3 class="message__author">ChatBot</h3>
      <div class="message__content">
        <i>${user} has left the conversation!</i>
      </div>
      `;
    messagesList.appendChild(message);
  }
};

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message', 'message--received');
  if(author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}

loginForm.addEventListener('submit', function login(e) {
  e.preventDefault();
  if(userNameInput.value){
    userName = userNameInput.value;
    socket.emit('login', (userName))
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  } else (
    alert('You must login first')
  );
});

addMessageForm.addEventListener('submit', function sendMessage(e) {
  e.preventDefault();
  if(messageContentInput.value){
    addMessage(userName, messageContentInput.value);
    socket.emit('message', ({ author: userName, content: messageContentInput.value }));
    messageContentInput.value = '';
  } else {
    alert('You must insert your message first');
  };
});