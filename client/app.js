const socket = io();


const select = {
  loginForm: '#welcome-form',
  messagesSection: '#messages-section',
  messagesList: '#messages-list',
  addMessageForm: '#add-messages-form',
  userNameInput: '#username',
  messageContentInput: 'message-content',
}

let userName;

socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('join', (user) => addMessage('Chat-bot', user + ' has joined conversation'));
socket.on('logout', (user) => addMessage('Chat-bot', user + ' has left conversation'));

const addMessage = function(author, content){
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if(author === userName) message.classList.add('message--self');
  if(author === 'Chat-bot') message.classList.add('message--chat')
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;

  const messagesList = document.querySelector(select.messagesList);
  messagesList.appendChild(message);

}; 

const loginClickHandler = function(event){
  /* prevent default action for this event */
  event.preventDefault();

  const name = document.querySelector(select.userNameInput);
  if (name.validity.valueMissing) {
    alert("Podaj imię!");
  } else {
    userName = name.value;
    socket.emit('join', userName );
    const login = document.querySelector(select.loginForm);
    login.classList.remove('show');
    const messagesSect = document.querySelector(select.messagesSection);
    messagesSect.classList.add('show');
  }
}

const messageClickHandler = function(event){
  /* prevent default action for this event */
  event.preventDefault();

  const message = document.getElementById(select.messageContentInput);
  message.focus();
  if (message.validity.valueMissing) {
    alert("Wpisz wiadomość");
  } else {
    addMessage(userName, message.value);
    
    socket.emit('message', { author: userName, content: message.value });
    
    message.value="";
  }
}

const addClickListenerToSubmit = function(){
  /* find all Submit buttons */
  const submit = document.querySelectorAll('button[type="submit"]');

  /* add submitClickHandler as event listener */
  submit[0].addEventListener('click', loginClickHandler);
  submit[1].addEventListener('click', messageClickHandler);

   
}

addClickListenerToSubmit();
