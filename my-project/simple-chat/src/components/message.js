import { saveMessage, loadMessages } from './storage';

export function clearMessages(chatId) {
    localStorage.removeItem(`messages_${chatId}`);
    const messagesDiv = document.querySelector('.messages-container');
    if (messagesDiv) {
        messagesDiv.innerHTML = ''; // Очищаем окно чата
    }
    // Обновляем интерфейс для последнего сообщения
    updateLastMessage(chatId, null); // Передаем null, чтобы показать "Нет сообщений"
}




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

    input.value = '';
    const chatWindow = document.querySelector('.chat-window');
    if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}

export function updateLastMessage(chatId, message) {
    const chatButton = document.querySelector(`.chat-item[data-chat-id="${chatId}"]`);
    if (chatButton) {
        const lastMessageText = chatButton.querySelector('.chat-info div');
        const lastMessageTime = chatButton.querySelector('.chat-time span');

        if (lastMessageText && lastMessageTime) {
            if (message) {
                if (message.isImage) {
                    lastMessageText.textContent = `${message.name}`;
                } else if (message.content && message.type) {
                    lastMessageText.textContent = `${message.name}`;
                } else if (message.text) {
                    lastMessageText.textContent = message.text;
                } else {
                    lastMessageText.textContent = 'Нет сообщений';
                }
                lastMessageTime.textContent = message.time || '';
            } else {
                lastMessageText.textContent = 'Нет сообщений';
                lastMessageTime.textContent = '';
            }
        }
    }
}

export function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        
        // Создаем событие submit с отменяемым поведением
        const submitEvent = new Event('submit', { cancelable: true });
        
        // Отправляем событие на форму
        const form = document.querySelector('form');
        if (form) {
            form.dispatchEvent(submitEvent);
        }
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




