export const API_URL = 'https://vkedu-fullstack-div2.ru/api';

// Регистрация пользователя
export const registerUser = async (data) => {
    const response = await fetch(`${API_URL}/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

// Аутентификация пользователя
export const loginUser = async (data) => {
    const response = await fetch(`${API_URL}/auth/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    localStorage.setItem('accessToken', result.access);
    localStorage.setItem('refreshToken', result.refresh);
    return result;
};

// Получение заголовков с авторизацией
export const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
});

// Обновление токенов
export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('Refresh token not found');
    const response = await fetch(`${API_URL}/auth/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
    });

    const result = await response.json();
    if (response.ok) {
        localStorage.setItem('accessToken', result.access);
        localStorage.setItem('refreshToken', result.refresh);
        return result;
    } else {
        throw new Error('Failed to refresh token');
    }
};

// Получаем свой ID
export const getCurrentUser = async () => {
    const response = await fetch(`${API_URL}/user/current/`, {
        headers: getAuthHeaders()
    })

    return response.json()
}

// Получение сообщений из чата
export const fetchChatMessages = async () => {
    const response = await fetch(`${API_URL}/messages/`, {
        headers: getAuthHeaders(),
    });

    return response.json();
};

// Отправка сообщения
export const sendMessage = async (message) => {
    const response = await fetch(`${API_URL}/messages/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ text: message }),
    });
    return response.json();
};

// Создание нового чата
export const createChat = async (data) => {
    const response = await fetch(`${API_URL}/chats/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });
    return response.json();
};

export const getAllChats = async (page, page_size, search) => {
    console.log(page, page_size, search);
    const response = await fetch(`${API_URL}/chats/`,
        {
            method: 'GET',
            headers: getAuthHeaders()
        }
    )
    const data = await response.json();
    return [data]
}

// Удаление сообщения
// export const deleteMessage = async (chatId, messageId) => {
//     const response = await fetch(`${API_URL}/chats/${chatId}/messages/${messageId}/`, {
//         method: 'DELETE',
//         headers: getAuthHeaders(),
//     });
//     if (!response.ok) {
//         throw new Error('Failed to delete message');
//     }
//     return response.status;
// };

// Отправка сообщения на сервер
export const sendMessageToBackend = async (chat, text = null, files = [], voice = null) => {
    const formData = new FormData();
    formData.append('chat', chat);
    if (text) formData.append('text', text);
    if (files.length > 0) {
        files.forEach((file) => formData.append('files', file));
    }
    if (voice) formData.append('voice', voice);

    const response = await fetch(`${API_URL}/messages/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
        body: formData
    });

    if (!response.ok) {
        throw new Error('Failed to send message');
    }

    return response.json();
};


// Загрузка сообщений с сервера
export const fetchMessagesFromBackend = async (chat, page = 1, pageSize = 20) => {

    const response = await fetch(`${API_URL}/messages/?chat=${chat}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });


    if (!response.ok) {
        throw new Error('Failed to fetch messages');
    }

    return response.json();
};

// получение последних сообщений из всех чатов
export const fetchChatsWithLastMessages = async () => {
    const response = await fetch(`${API_URL}/chats/`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch chats');
    }
    
    return response.json();
};