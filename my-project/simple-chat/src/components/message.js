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

    const chatId = localStorage.getItem('currentChat');
    saveMessage(chatId, message);

    // Добавляем сообщение в DOM
    addMessageToDOM(message);

    // Обновляем кнопку чата с последним сообщением
    updateLastMessage(chatId, message);

    // Очищаем поле ввода и прокручиваем окно чата к последнему сообщению
    input.value = '';
    const chatWindow = document.querySelector('.chat-window');
    if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}

export function updateLastMessage(chatId, message) {
    const chatButton = document.querySelector(`.chat-item[data-chat-id="${chatId}"]`);
    if (chatButton) {
        const lastMessageText = chatButton.querySelector('.chat-info p');
        const lastMessageTime = chatButton.querySelector('.chat-time span');

        if (lastMessageText && lastMessageTime) {
            lastMessageText.textContent = message.text;
            lastMessageTime.textContent = message.time;
        } else {
            console.error("Unable to find elements for last message or time within the chat button.");
        }
    } else {
        console.error("Chat button not found for chat ID:", chatId);
    }
}



export function handleKeyPress(event) {
    const form = document.querySelector('form');
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
}


export function addMessageToDOM(message) {
    const messagesDiv = document.querySelector('.messages-container');

    const messageElement = document.createElement('div');
    messageElement.classList.add('message-container');

    const senderElement = document.createElement('div');
    senderElement.classList.add('message-sender');
    senderElement.textContent = message.sender || 'Вы';

    const timeElement = document.createElement('div');
    timeElement.classList.add('message-time');
    timeElement.textContent = message.time;

    const contentElement = document.createElement('div');
    contentElement.classList.add('message-content');

    // Проверка на тип содержимого сообщения
    if (message.isImage) {
        // Если это изображение
        const imgElement = document.createElement('img');
        imgElement.src = message.content;
        imgElement.alt = message.name;
        imgElement.classList.add('message-image');
        contentElement.appendChild(imgElement);
    } else if (message.content && message.type) {
        // Если это файл, но не изображение
        const fileLink = document.createElement('a');
        fileLink.href = message.content;
        fileLink.textContent = message.name;
        fileLink.download = message.name;
        contentElement.appendChild(fileLink);
    } else {
        // Если это обычное текстовое сообщение
        contentElement.textContent = message.text || '';
    }

    messageElement.appendChild(senderElement);
    messageElement.appendChild(contentElement);
    messageElement.appendChild(timeElement);

    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}




