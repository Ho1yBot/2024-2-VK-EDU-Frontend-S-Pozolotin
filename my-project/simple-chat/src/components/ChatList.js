// import './../styles/chatList.css';
import { loadMessages, saveMessage } from './storage.js';
import { handleSubmit, handleKeyPress, addMessageToDOM } from './message';


export function ChatList() {
    const chatContainer = document.createElement('div');
    chatContainer.classList.add('chat-container');

    const chats = [
        {
            id: 1,
            avatar: './static/images/user-icon.svg',
            title: 'Чат с Андреем',
            lastMessage: 'Последнее сообщение...',
            time: '14:23',
            isRead: true,
        },
        // Добавьте больше чатов...
    ];

    chats.forEach((chat) => {
        const chatItem = document.createElement('button');
        chatItem.classList.add('chat-item');

        chatItem.innerHTML = `
            <div class="chat-info-wrp">
                <img src="${chat.avatar}" alt="Аватарка">
                <div class="chat-info">
                    <h3>${chat.title}</h3>
                    <p>${chat.lastMessage}</p>
                </div>
            </div>
            <div class="chat-time">
                <span>${chat.time}</span>
                ${chat.isRead ? '<span class="read-status">✓✓</span>' : ''}
            </div>`;

        chatItem.addEventListener('click', () => openChat(chat.id, chat.title));

        chatContainer.appendChild(chatItem);
    });

    // Функция для открытия чата
    function openChat(chatId, chatTitle) {
        setCurrentChat(chatId); // Сохраняем текущий чат

        // Скрываем кнопку добавления чата
        const addChatButton = document.getElementById('floating-button-component');
        if (addChatButton) {
            addChatButton.style.display = 'none';
        }

        const chatListComponent = document.getElementById('chat-list-component');
        chatListComponent.style.display = 'none';

        const chatComponent = document.createElement('div');
        chatComponent.classList.add('chat-window', 'center');
        chatComponent.innerHTML = `
            <div class="chat-header">
                <button class="back-button">Назад</button>
                <h3>${chatTitle}</h3>
            </div>
            <div class="messages-container"></div>
    
            <form class="form" action="/">
                <textarea class="form-input" name="message-text" placeholder="Введите сообщение" type="text"></textarea>
                <button class="attach"><img src="./static/images/attach-file-icon.svg" alt="Добавление файла"></button>
                <button type="submit"><img src="./static/images/send-icon.svg" alt="Отправка сообщения"></button>
            </form>`;

        const header = document.getElementById('header-component');
        header.insertAdjacentElement('afterend', chatComponent);

        // Возврат к списку чатов
        chatComponent.querySelector('.back-button').addEventListener('click', closeChat);

        // Загрузка сообщений в DOM
        loadMessagesToDOM(chatId);

        // Обработка формы
        const form = chatComponent.querySelector('form');

        // Предотвращаем перезагрузку страницы при отправке формы
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Предотвращаем стандартное поведение формы
            handleSubmit(event);
        });
    }

    function closeChat() {
        const chatComponent = document.querySelector('.chat-window');
        chatComponent.remove();

        const chatListComponent = document.getElementById('chat-list-component');
        chatListComponent.style.display = 'flex';

        // Показываем кнопку добавления чата при возврате к списку чатов
        const addChatButton = document.getElementById('floating-button-component');
        if (addChatButton) {
            addChatButton.style.display = 'block';
        }
    }


    // Функция загрузки сообщений в DOM
    // ChatList.js
    function loadMessagesToDOM(chatId) {
        const messages = loadMessages(chatId); // Загружаем сообщения по chatId
        const messagesDiv = document.querySelector('.messages-container');
        messages.forEach((message) => addMessageToDOM(message, messagesDiv)); // Добавляем каждое сообщение в DOM
    }


    // Функция для сохранения текущего чата
    function setCurrentChat(chatId) {
        localStorage.setItem('currentChat', chatId);
    }

    // Функция для получения текущего чата
    function getCurrentChat() {
        return localStorage.getItem('currentChat');
    }

    return chatContainer;
}
