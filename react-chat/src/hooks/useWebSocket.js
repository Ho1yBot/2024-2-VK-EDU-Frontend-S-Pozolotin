// src/hooks/useWebSocket.js
import { useEffect, useState } from 'react';
import { Centrifuge } from 'centrifuge';
import { getAuthHeaders } from './../utils/api';

const useWebSocket = (ID) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!ID) return;

    const centrifuge = new Centrifuge('wss://vkedu-fullstack-div2.ru/connection/websocket/', {
      getToken: (ctx) => fetch(`https://vkedu-fullstack-div2.ru/api/centrifugo/connect/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(ctx),
      }).then((res) => res.json().then((data) => data.token)),
    });

    const subscription = centrifuge.newSubscription(ID, {
      getToken: (ctx) => fetch(`https://vkedu-fullstack-div2.ru/api/centrifugo/subscribe/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(ctx),
      }).then((res) => res.json().then((data) => data.token)),
    });

    subscription.on('publication', (ctx) => {
      console.log(ctx);
      setMessages((prev) => [...prev, ctx.data]); // Добавляем новое сообщение
    });

    subscription.subscribe();
    centrifuge.connect();

    return () => {
      centrifuge.disconnect();
    };
  }, [ID]);

  return messages;
};

export default useWebSocket;
