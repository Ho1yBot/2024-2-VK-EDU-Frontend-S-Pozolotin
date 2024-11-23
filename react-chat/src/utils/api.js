// src/utils/api.js
const API_URL = 'https://vkedu-fullstack-div2.ru/api';

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

export const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
});


export const fetchChatMessages = async (chatId) => {
    const response = await fetch(`${API_URL}/chats/${chatId}/messages/`, {
        headers: getAuthHeaders(),
    });
    return response.json();
};

export const sendMessage = async (chatId, message) => {
    const response = await fetch(`${API_URL}/chats/${chatId}/messages/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ text: message }),
    });
    return response.json();
};
