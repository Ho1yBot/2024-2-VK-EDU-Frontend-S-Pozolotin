// Сохраняем сообщение для указанного чата
export function saveMessage(chatId, message) {
    let messages = JSON.parse(localStorage.getItem(`messages_${chatId}`)) || [];
    messages.push(message);
    localStorage.setItem(`messages_${chatId}`, JSON.stringify(messages));
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

// Очищаем все сообщения и обновляем все чаты
export function clearLocalStorage() {
    localStorage.clear();
    // Вызываем обновление для всех чатов, если нужно (можно добавить перебор всех id чатов)
    document.querySelectorAll('.chat-info').forEach(info => info.textContent = 'Нет сообщений');
}
