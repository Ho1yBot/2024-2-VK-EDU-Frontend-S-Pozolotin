import { saveMessage } from './storage';

export function handleSubmit(event) {
    event.preventDefault();
    const input = document.querySelector('.form-input');
    const messageText = input.value.trim();
    const fileInput = document.querySelector('.file-input'); // Поле для выбора файла
    const attachedFile = fileInput.files[0]; // Получаем прикрепленный файл

    if (!messageText && !attachedFile) return; // Если нет текста и файла, не отправляем

    const chatId = localStorage.getItem('currentChat');

    if (attachedFile) {
        // Если файл прикреплен, конвертируем его в Base64
        const reader = new FileReader();
        reader.readAsDataURL(attachedFile);
        reader.onload = function () {
            const message = {
                text: messageText || '', // Если нет текста, отправляем только файл
                sender: 'Вы',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                file: reader.result // Сохраняем файл как Base64 строку
            };

            saveMessage(chatId, message); // Сохраняем сообщение с файлом
            addMessageToDOM(message); // Отображаем сообщение в DOM

            input.value = ''; // Очищаем поле текста
            fileInput.value = ''; // Очищаем поле выбора файла
        };
    } else {
        // Если файла нет, отправляем только текст
        const message = {
            text: messageText,
            sender: 'Вы',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            file: null // Нет файла
        };

        saveMessage(chatId, message);
        addMessageToDOM(message);
        input.value = ''; // Очищаем поле
    }
}


export function handleKeyPress(event) {
    const form = document.querySelector('form');
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
}


export function addMessageToDOM(message, messagesDiv) {
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
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Прокрутка к последнему сообщению
}




