import { saveMessage } from './storage';

export function handleSubmit(event) {
    event.preventDefault();
    const input = document.querySelector('.form-input');
    const messageText = input.value.trim();
    if (!messageText) return;

    const message = {
        text: messageText,
        sender: 'Вы',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Получаем текущий chatId и сохраняем сообщение в локальное хранилище
    const chatId = localStorage.getItem('currentChat');
    saveMessage(chatId, message);
    addMessageToDOM(message);
    input.value = '';
}

export function handleKeyPress(event) {
    const form = document.querySelector('form');
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
}


export function addMessageToDOM(message) {
    const messagesDiv = document.querySelector('.messages-container'); // Находим контейнер сообщений

    const messageElement = document.createElement('div');
    messageElement.classList.add('message-container');

    const senderElement = document.createElement('div');
    senderElement.classList.add('message-sender');
    senderElement.textContent = message.sender;

    const textElement = document.createElement('div');
    textElement.classList.add('message-text');
    textElement.textContent = message.text;

    const timeElement = document.createElement('div');
    timeElement.classList.add('message-time');
    timeElement.textContent = message.time;

    messageElement.appendChild(senderElement);
    messageElement.appendChild(textElement);
    messageElement.appendChild(timeElement);

    messagesDiv.appendChild(messageElement); // Добавляем сообщение в контейнер
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Прокручиваем к последнему сообщению
}


