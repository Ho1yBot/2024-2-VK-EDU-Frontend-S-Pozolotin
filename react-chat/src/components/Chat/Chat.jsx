// src/components/Chat/Chat.jsx
import { Centrifuge } from 'centrifuge';
import { getAuthHeaders } from '../utils/api';

const connectToWebSocket = (userId) => {
  console.log('Connecting to WebSocket with userId:', userId); // Проверка перед подключением

  const centrifuge = new Centrifuge('wss://vkedu-fullstack-div2.ru/connection/websocket/', {
    getToken: (ctx) => {
      console.log('Requesting connection token with context:', ctx); // Проверка перед запросом токена
      return fetch(`${API_URL}/centrifugo/connect/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(ctx),
      }).then((res) => res.json().then((data) => {
        console.log('Received connection token:', data.token); // Проверка полученного токена
        return data.token;
      }));
    },
  });

  const subscription = centrifuge.newSubscription(userId, {
    getToken: (ctx) => {
      console.log('Requesting subscription token with context:', ctx); // Проверка перед запросом токена подписки
      return fetch(`${API_URL}/centrifugo/subscribe/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(ctx),
      }).then((res) => res.json().then((data) => {
        console.log('Received subscription token:', data.token); // Проверка полученного токена подписки
        return data.token;
      }));
    },
  });

  subscription.on('publication', function (ctx) {
    console.log('New message received from WebSocket:', ctx.data); // Проверка полученного сообщения
  });

  subscription.subscribe();
  centrifuge.connect();
  console.log('WebSocket connection established');
};
