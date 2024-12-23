import { addMessageToDOM } from './message.js';
import { updateLastMessage } from './message.js';

export const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.style.display = 'none';

export function initFileUpload() {
    fileInput.addEventListener('change', handleFileUpload);
}

export function handleFileUpload(event) {
    const file = event.target.files[0];
    
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        const currentChatId = getCurrentChat();
        const fileData = {
            name: file.name,
            content: reader.result,
            type: file.type,
            time: new Date().toLocaleTimeString(),
            isImage: file.type.startsWith('image/')
        };

        // Сохраняем сообщение в хранилище
        let messages = JSON.parse(localStorage.getItem(`messages_${currentChatId}`)) || [];
        messages.push(fileData);
        localStorage.setItem(`messages_${currentChatId}`, JSON.stringify(messages));

        // Добавляем последний файл в DOM
        addMessageToDOM(messages[messages.length-1]);
        // Обновляем последний элемент в chat-info div
        updateLastMessage(currentChatId, fileData);
    };
    reader.readAsDataURL(file);
}

export function getCurrentChat() {
    return localStorage.getItem('currentChat');
}
