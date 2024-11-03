import { saveMessage } from './storage.js';
import { addMessageToDOM } from './message.js';

export const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.style.display = 'none';

export function initFileUpload() {
    fileInput.addEventListener('change', handleFileUpload);
}

export function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return; // Проверка на наличие файла

    const reader = new FileReader();
    reader.onload = () => {
        const currentChatId = getCurrentChat();
        const fileData = {
            name: file.name,
            content: reader.result,
            type: file.type,
            time: new Date().toLocaleTimeString(),
            isImage: file.type.startsWith('image/') // Проверка, является ли файл изображением
        };

        saveMessage(currentChatId, fileData); // Сохраняем файл в localStorage
        addMessageToDOM(fileData); // Добавляем файл в интерфейс
        fileInput.value = ''; // Сбрасываем значение input для возможности загрузки следующего файла
    };
    
    reader.readAsDataURL(file); // Преобразуем файл в base64
}

function getCurrentChat() {
    return localStorage.getItem('currentChat');
}
