const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');
let userName = '';

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
  } else {
    alert('You must insert your message first');
  };
});