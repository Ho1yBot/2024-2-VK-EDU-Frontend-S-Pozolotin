
export function saveMessage(chatId, message) {
    let messages = JSON.parse(localStorage.getItem(`messages_${chatId}`)) || [];
    messages.push(message);
    localStorage.setItem(`messages_${chatId}`, JSON.stringify(messages));
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
