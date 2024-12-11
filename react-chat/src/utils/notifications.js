// utils/notifications.js
export const requestNotificationPermission = async () => {
    if ("Notification" in window) {
        if (Notification.permission === "default") {
            await Notification.requestPermission();
        }
    }
};

export const showNotification = (title, options = {}) => {
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, options);
    }
};

export const playNotificationSound = () => {
    // const audio = new Audio("/sounds/new_message_tone.mp3"); 
    // audio.play();
};
