// components/Storage/Storage.js

// Функция сохранения сообщения в localStorage
export function saveMessage(chatId, message) {
    let messages = JSON.parse(localStorage.getItem(`messages_${chatId}`)) || [];
    messages.push(message);

    try {
        localStorage.setItem(`messages_${chatId}`, JSON.stringify(messages));
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            console.error('LocalStorage quota exceeded');
            alert('Превышен лимит на хранение данных. Удалите старые сообщения или файлы.');
        }
    }
}

// Функция загрузки сообщений из localStorage для указанного чата
// export function loadMessages(chatId) {
//     return JSON.parse(localStorage.getItem(`messages_${chatId}`)) || [];
// }

// Функция для очистки сообщений конкретного чата в localStorage
export function clearMessages(chatId) {
    localStorage.removeItem(`messages_${chatId}`);
}

// Очистка всех данных localStorage
export function clearAllLocalStorage() {
    localStorage.clear();
}

// Добавляем функцию для удаления отдельного сообщения из чата
export function deleteMessage(chatId, messageId) {
    let messages = JSON.parse(localStorage.getItem(`messages_${chatId}`)) || [];
    const updatedMessages = messages.filter(message => message.id !== messageId);
    
    localStorage.setItem(`messages_${chatId}`, JSON.stringify(updatedMessages));
}
