// Сохраняем сообщение для указанного чата
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


// Загружаем все сообщения для указанного чата
export function loadMessages(chatId) {
    return JSON.parse(localStorage.getItem(`messages_${chatId}`)) || [];
}

// Загружаем последнее сообщение для указанного чата
export function loadLastMessage(chatId) {
    const messages = loadMessages(chatId);
    return messages.length ? messages[messages.length - 1] : null;
}

// Очищаем сообщения и обновляем chat-info
export function clearMessages(chatId) {
    localStorage.removeItem(`messages_${chatId}`);
    updateLastMessage(chatId); // Обновляем chat-info для чата
}

// Очистка чат
export function clearLocalStorage(chatId) {
    
    localStorage.removeItem(`messages_${chatId}`);
    // Выводим обновление в очищенном чате
    document.querySelector(`[data-currentChat="${chatId}"]`).textContent = 'Нет сообщений';
}
