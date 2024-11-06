import { saveMessage } from './storage.js';
import { addMessageToDOM } from './message.js';

export const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.style.display = 'none';

export function initFileUpload() {
    fileInput.addEventListener('change', handleFileUpload);
}

import { updateLastMessage } from './message.js';

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

        // Обновляем последний элемент в chat-info p
        updateLastMessage(currentChatId, fileData);
    };
    reader.readAsDataURL(file);
}





function getCurrentChat() {
    return localStorage.getItem('currentChat');
}
