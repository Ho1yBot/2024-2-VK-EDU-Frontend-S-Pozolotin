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

        // Создаем компонент окна чата
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
                <div class="attached-file-info" style="display: none;"></div> <!-- Для отображения прикрепленного файла -->
                <input type="file" id="file-input" style="display: none;" /> <!-- Поле для выбора файла -->
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
        const fileInput = chatComponent.querySelector('#file-input');
        const attachButton = chatComponent.querySelector('.attach');
        const attachedFileInfo = chatComponent.querySelector('.attached-file-info');

        // Обработчик для выбора файла
        attachButton.addEventListener('click', (event) => {
            event.preventDefault();
            fileInput.click(); // Открываем окно выбора файла
        });

        // При выборе файла показываем его статус
        fileInput.addEventListener('change', (event) => {
            attachedFile = event.target.files[0]; // Сохраняем выбранный файл

            // Проверка размера файла (например, 1MB лимит)
            if (attachedFile && attachedFile.size > 5000000) { // 1 MB = 1,000,000 байт
                alert('Файл слишком большой для загрузки. Должен быть меньше 5 МБ');
                attachedFile = null; // Сбрасываем выбранный файл
                return; // Выходим из функции
            }

            if (attachedFile) {
                attachedFileInfo.textContent = `Файл: ${attachedFile.name} прикреплен`;
                attachedFileInfo.style.display = 'block'; // Отображаем информацию о прикрепленном файле
                attachedFileInfo.style.position = 'absolute';
                attachedFileInfo.style.bottom = '48px';
            }
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault(); 
            const messageText = form.querySelector('textarea').value.trim();
            const messagesDiv = document.querySelector('.messages-container');
        
            if (messageText || attachedFile) {
                if (attachedFile) {
                    const reader = new FileReader();
                    reader.readAsDataURL(attachedFile);
                    reader.onload = function () {
                        const message = {
                            text: messageText || '',
                            time: new Date().toLocaleTimeString(),
                            file: reader.result
                        };
                        saveMessage(chatId, message);
                        addMessageToDOM(message, messagesDiv); // Передаем контейнер
                        form.querySelector('textarea').value = '';
                        attachedFile = null;
                        attachedFileInfo.style.display = 'none'; 
                    };
                } else {
                    const message = {
                        text: messageText || '',
                        time: new Date().toLocaleTimeString(),
                        file: null 
                    };
                    saveMessage(chatId, message);
                    addMessageToDOM(message, messagesDiv); // Передаем контейнер
                    form.querySelector('textarea').value = '';
                }
            }
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
        const messages = loadMessages(chatId);
        const messagesDiv = document.querySelector('.messages-container');
        messages.forEach((message) => addMessageToDOM(message, messagesDiv)); // Добавляем каждое сообщение в DOM

        // Прокручиваем контейнер к последнему сообщению
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }


    // Функция для сохранения текущего чата
    function setCurrentChat(chatId) {
        localStorage.setItem('currentChat', chatId);
    }

    return chatContainer;


}
