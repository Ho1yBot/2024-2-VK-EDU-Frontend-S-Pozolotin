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

        // Загружаем сообщения этого чата
        const messages = loadMessages(chat.id); // Загрузка сообщений по chatId
        const lastMessage = messages.length > 0 ? messages[messages.length - 1] : { text: 'Нет сообщений', time: '' };

        chatItem.innerHTML = `
        <div class="chat-info-wrp">
            <img src="${chat.avatar}" alt="Аватарка">
            <div class="chat-info">
                <h3>${chat.title}</h3>
                <p>${lastMessage.text}</p> <!-- Показываем последнее сообщение -->
            </div>
        </div>
        <div class="chat-time">
            <span>${lastMessage.time || ''}</span> <!-- Показываем время последнего сообщения -->
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
    
        // Показываем кнопку меню
        const menuButton = document.getElementById('menu-button');
        menuButton.style.display = 'block'; 
    
        const chatComponent = document.createElement('div');
        chatComponent.classList.add('chat-window', 'center');
        chatComponent.innerHTML = `
            <div class="chat-header">
                <button class="back-button"><img src="./static/images/arrow-back.svg" alt="Вернуться к списку чатов"></button>
            </div>
            <div class="messages-container"></div>
        
            <form class="form" action="/">
                <textarea class="form-input" name="message-text" placeholder="Введите сообщение" type="text"></textarea>
                <button class="attach"><img src="./static/images/attach-file-icon.svg" alt="Добавление файла"></button>
                <button type="submit"><img src="./static/images/send-icon.svg" alt="Отправка сообщения"></button>
            </form>`;
    
        const headerTitle = document.querySelector('.header_title-text');
        headerTitle.textContent = chatTitle; // Обновляем текст в header на имя пользователя
    
        const header = document.getElementById('header-component');
        header.insertAdjacentElement('afterend', chatComponent);
    
        // Возврат к списку чатов
        chatComponent.querySelector('.back-button').addEventListener('click', closeChat);
    
        // Загрузка сообщений в DOM
        loadMessagesToDOM(chatId);
    
        // Обработка формы
        const form = chatComponent.querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Предотвращаем стандартное поведение формы
            handleSubmit(event);
        });
        form.addEventListener('keypress', handleKeyPress);

        document.getElementById("clear-local-storage").addEventListener('click', () => {
            const currentChatId = getCurrentChat();
            if (currentChatId) {
                // Удаляем сообщения из LocalStorage
                localStorage.removeItem(`messages_${currentChatId}`);
                
                // Очищаем контейнер сообщений на экране
                const messagesDiv = document.querySelector('.messages-container');
                messagesDiv.innerHTML = '';
            }
        });
        
    }
    
    function closeChat() {
        const chatComponent = document.querySelector('.chat-window');
        chatComponent.remove();
    
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
        const messages = loadMessages(chatId); // Загружаем сообщения по chatId
        const messagesDiv = document.querySelector('.messages-container');
        messages.forEach((message) => addMessageToDOM(message, messagesDiv)); // Добавляем каждое сообщение в DOM
    
        // Прокручиваем контейнер к последнему сообщению
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
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
