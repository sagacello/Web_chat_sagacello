const socket = window.io();

const teste = 'data-testid';
let nameUser = '';
let nickRandom = '';
const chatMessage = document.querySelector('#messageInput'); 

const createUsers = (listServer) => {
  const ul = document.querySelector('#menu');
  ul.innerHTML = '';
  const li = document.createElement('a');
  li.setAttribute('class', 'header');
  li.innerHTML = listServer[socket.id];
  if (!nameUser) nickRandom = listServer[socket.id];
  nameUser = listServer[socket.id];
  ul.appendChild(li);
  Object.entries(listServer).map((item) => {
    if (item[0] !== socket.id) {
      const liRandom = document.createElement('a');
      liRandom.setAttribute('class', 'header');
      const vId = 1;
      liRandom.innerHTML = item[vId];
      return ul.appendChild(liRandom);
    }
    return false; 
  });
};

document.querySelector('#buttonChangeName').addEventListener('click', () => {
  nameUser = document.querySelector('#nameInput').value;
  document.querySelector('#nameInput').value = '';
  socket.emit('nickname', nameUser);
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const message = {
    date: Date(),
    chatMessage: chatMessage.value,
    nickname: !nameUser
      ? nickRandom
      : nameUser,
  };
  socket.emit('message', message); 
  chatMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute(teste, 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
socket.on('nickRandom', ({ usersOnline }) => createUsers(usersOnline));
socket.on('onlineUsers', ({ usersOnline }) => createUsers(usersOnline));
socket.on('history', (history) => {
  history.forEach((item) => {
    createMessage(`${item.timestamp} - ${item.nickname}: ${item.message}`);
  });
});
