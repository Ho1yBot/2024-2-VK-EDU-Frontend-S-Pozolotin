import { useEffect, useState } from "react";
import { Centrifuge } from "centrifuge";
import { getAuthHeaders } from "./../utils/api";

const useWebSocket = (chatId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chatId) return;

    const centrifuge = new Centrifuge("wss://vkedu-fullstack-div2.ru/connection/websocket/", {
      getToken: (ctx) =>
        fetch("https://vkedu-fullstack-div2.ru/api/centrifugo/connect/", {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(ctx),
        }).then((res) => res.json().then((data) => data.token)),
    });

    const subscription = centrifuge.newSubscription(chatId, {
      getToken: (ctx) =>
        fetch("https://vkedu-fullstack-div2.ru/api/centrifugo/subscribe/", {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(ctx),
        }).then((res) => res.json().then((data) => data.token)),
    });

    subscription.on("publication", (ctx) => {
      setMessages((prev) => [...prev, ctx.data]);
    });

    subscription.subscribe();
    centrifuge.connect();

    return () => {
      centrifuge.disconnect();
    };
  }, [chatId]);

  return messages;
};

export default useWebSocket;
