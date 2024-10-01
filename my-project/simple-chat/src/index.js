import './index.css';

const form = document.querySelector('form');
const input = document.querySelector('.form-input');
const messagesDiv = document.getElementById('messages');

form.addEventListener('submit', handleSubmit);
form.addEventListener('keypress', handleKeyPress);

// Загрузка сообщений из localStorage при загрузке страницы
window.addEventListener('DOMContentLoaded', loadMessages);

function handleSubmit(event) {
    event.preventDefault();

    const messageText = input.value.trim();
    if (!messageText) return; // Игнорируем пустые сообщения

    const message = {
        text: messageText,
        sender: 'Вы',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    saveMessage(message);
    addMessageToDOM(message);
    input.value = ''; // Очистка поля ввода после отправки
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        form.dispatchEvent(new Event('submit'));
    }
}

function saveMessage(message) {
    // Получаем данные из localStorage или создаем пустой массив
    let messages = [];

    // Проверяем, существуют ли сообщения в localStorage
    const storedMessages = localStorage.getItem('messages');

    // Если сообщения существуют, пытаемся их разобрать
    if (storedMessages) {
        try {
            messages = JSON.parse(storedMessages);
        } catch (error) {
            console.error("Ошибка при парсинге сообщений из localStorage:", error);
            // Если ошибка, очищаем localStorage
            localStorage.removeItem('messages');
        }
    }

    // Добавляем новое сообщение
    messages.push(message);

    // Сохраняем обновленные данные обратно в localStorage
    localStorage.setItem('messages', JSON.stringify(messages));
}

function loadMessages() {
    let messages = [];

    // Проверяем наличие сообщений в localStorage
    const storedMessages = localStorage.getItem('messages');

    // Если сообщения существуют, пытаемся их разобрать
    if (storedMessages) {
        try {
            messages = JSON.parse(storedMessages);
        } catch (error) {
            console.error("Ошибка при парсинге сообщений из localStorage:", error);
            // Если ошибка, очищаем localStorage
            localStorage.removeItem('messages');
        }
    }

    // Отображаем все сообщения в DOM
    messages.forEach(addMessageToDOM);
}

function addMessageToDOM(message) {
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

    messagesDiv.appendChild(messageElement);

    // Прокрутка вниз для отображения последнего сообщения
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
