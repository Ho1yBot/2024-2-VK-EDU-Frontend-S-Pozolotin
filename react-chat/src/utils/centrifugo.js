import Centrifuge from 'centrifuge';

let centrifuge;

async function getConnectToken() {
    const response = await fetch('/api/centrifugo/connect/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    const data = await response.json();
    return data.token;
}

async function getSubscribeToken(chatId) {
    const response = await fetch('/api/centrifugo/subscribe/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ channel: chatId }),
    });
    const data = await response.json();
    return data.token;
}

export async function initializeCentrifugo() {
    const token = await getConnectToken();
    centrifuge = new Centrifuge('ws://centrifugo-server-address/connection/websocket', {
        token,
    });

    centrifuge.on('connect', () => {
        console.log('Connected to Centrifugo');
    });

    centrifuge.on('disconnect', (context) => {
        console.error('Disconnected:', context.reason);
    });

    centrifuge.connect();
    return centrifuge;
}

export async function subscribeToChat(chatId, onMessageReceived) {
    const token = await getSubscribeToken(chatId);
    centrifuge.subscribe(chatId, { token }, (context) => {
        if (context.data) {
            onMessageReceived(context.data);
        }
    });
}
