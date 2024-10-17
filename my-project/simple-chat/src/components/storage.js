
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


export function loadMessages(chatId) {
    return JSON.parse(localStorage.getItem(`messages_${chatId}`)) || []; // Загружаем сообщения для указанного чата
}


export function clearLocalStorage() {
    localStorage.clear();
    clearMessagesFromDOM();
}

function clearMessagesFromDOM() {
    messagesDiv.innerHTML = '';
}
