// import './../styles/chatList.css';
import { loadMessages, saveMessage } from './storage.js';
import { handleSubmit, handleKeyPress, addMessageToDOM } from './message';
import { fileInput, initFileUpload } from './fileUpload.js';

export function ChatList() {
    initFileUpload()

    const chatContainer = document.createElement('div');
    chatContainer.classList.add('chat-container');

    let attachedFile = null; // Переменная для хранения прикрепленного файла

    const chats = [
        {
            id: 1,
            avatar: './static/images/user-icon.svg',
            title: 'Чат с Андреем',
            lastMessage: '',
            time: '14:23',
            isRead: true,
        },
        {
            id: 2,
            avatar: './static/images/user-icon.svg',
            title: 'Чат с Max',
            lastMessage: '',
            time: '14:23',
            isRead: true,
        },
        {
            id: 3,
            avatar: './static/images/user-icon.svg',
            title: 'Чат с Андреем',
            lastMessage: '',
            time: '14:23',
            isRead: true,
        }
    ];

    chats.forEach((chat) => {

        const chatItem = document.createElement('button');
        chatItem.classList.add('chat-item');
        chatItem.setAttribute('data-chat-id', chat.id);


        const messages = loadMessages(chat.id);
        const lastMessage = messages.length > 0 ? messages[messages.length - 1] : { text: 'Нет сообщений', time: '' };

        chatItem.innerHTML = `
        <div class="chat-info-wrp">
            <img src="${chat.avatar}" alt="Аватарка">
            <div class="chat-info">
                <h3>${chat.title}</h3>
                <div data-currentChat=${chat.id}>${lastMessage.name || lastMessage.text}</div> 
            </div>
        </div>
        <div class="chat-time">
            <span>${lastMessage.time || ''}</span> 
            ${chat.isRead ? '<span class="read-status">✓✓</span>' : ''}
        </div>`;

        chatItem.addEventListener('click', () => openChat(chat.id, chat.title));

        chatContainer.appendChild(chatItem);
    });

    // Функция для открытия чата
    function openChat(chatId, chatTitle) {
        setCurrentChat(chatId);

        // Скрываем список чатов
        const chatListComponent = document.getElementById('chat-list-component');
        chatListComponent.style.display = 'none';

        // Показываем кнопку меню
        const menuButton = document.getElementById('menu-button');
        menuButton.style.display = 'block';

        // Создаем компонент окна чата
        const chatComponent = document.createElement('div');
        chatComponent.classList.add('chat-window', 'center');
        chatComponent.innerHTML = `
            <div class="chat-header">
                <button class="back-button"><img src="./static/images/arrow-back.svg" alt="Вернуться к списку чатов"></button>
            </div>
            <div class="messages-container"></div>
        `;

        const headerTitle = document.querySelector(".header_title-text");
        headerTitle.textContent = chatTitle;

        // Добавляем компонент окна чата после заголовка
        const header = document.getElementById('header-component');
        header.insertAdjacentElement('afterend', chatComponent);

        // Создаем форму на одном уровне с chatComponent
        const formElement = document.createElement('form');
        formElement.classList.add('form', "center");
        formElement.innerHTML = `
            <textarea class="form-input" name="message-text" placeholder="Введите сообщение" type="text"></textarea>
            <button class="attach"><img src="./static/images/attach-file-icon.svg" alt="Добавление файла"></button>
            <button type="submit"><img src="./static/images/send-icon.svg" alt="Отправка сообщения"></button>
        `;

        // Вызовите clearMessages при нажатии на кнопку "Очистить сообщения"
        const clearButton = chatComponent.querySelector('.clear-button');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                clearMessages(chatId);
            });
        }


        // Добавляем обработчики для формы
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            handleSubmit(event);
        });
        formElement.addEventListener('keypress', handleKeyPress);

        formElement.querySelector('.attach').addEventListener('click', () => {
            fileInput.click(); // Открываем окно выбора файла
        });

        // Добавляем форму сразу после chatComponent
        chatComponent.insertAdjacentElement('afterend', formElement);

        formElement.addEventListener('submit', handleSubmit);
        formElement.addEventListener('keypress', handleKeyPress);

        // Обработчик для кнопки назад
        chatComponent.querySelector('.back-button').addEventListener('click', closeChat);

        // Загружаем сообщения в DOM
        loadMessagesToDOM(chatId);

        const addChatButton = document.getElementById('floating-button-component');
        if (addChatButton) {
            addChatButton.style.display = 'none';
        }
        
        const messagesDiv = document.querySelector('.messages-container');
        document.querySelector('.chat-window').scrollTop = messagesDiv.scrollHeight;
    }

    function closeChat() {
        const chatComponent = document.querySelector('.chat-window');
        const formElement = document.querySelector('.form');

        // Удаляем и окно чата, и форму
        if (chatComponent) chatComponent.remove();
        if (formElement) formElement.remove();

        const chatListComponent = document.getElementById('chat-list-component');
        chatListComponent.style.display = 'flex';

        // Возвращаем заголовок обратно на "Messenger"
        const headerTitle = document.querySelector('.header_title-text');
        headerTitle.textContent = 'Messenger';

        // Скрываем кнопку меню
        const menuButton = document.getElementById('menu-button');
        menuButton.style.display = 'none';

        // Показываем кнопку добавления чата при возврате к списку чатов
        const addChatButton = document.getElementById('floating-button-component');
        if (addChatButton) {
            addChatButton.style.display = 'block';
        }
    }

    // Функция загрузки сообщений в DOM
    function loadMessagesToDOM(chatId) {
        const messages = loadMessages(chatId);
        const messagesDiv = document.querySelector('.messages-container');
        messages.forEach((message) => addMessageToDOM(message, messagesDiv)); // Добавляем каждое сообщение в DOM

        // Прокручиваем контейнер к последнему сообщению
        document.querySelector('.chat-window').scrollTop = messagesDiv.scrollHeight;
    }


    // Функция для сохранения текущего чата
    function setCurrentChat(chatId) {
        localStorage.setItem('currentChat', chatId);
    }

    return chatContainer;


}
