import './index.css';

const form = document.querySelector('form');
const input = document.querySelector('.form-input');
const messagesDiv = document.getElementById('messages');
const headerMenu = document.querySelector('.header_menu');
const attachButton = document.querySelector('.attach'); // Кнопка для открытия меню прикрепления

form.addEventListener('submit', handleSubmit);
form.addEventListener('keypress', handleKeyPress);

// Загрузка сообщений из localStorage при загрузке страницы
window.addEventListener('DOMContentLoaded', loadMessages);

function handleSubmit(event) {
    event.preventDefault();

    const messageText = input.value.trim();
    if (!messageText) return; // Игнорируем пустые сообщения

    const message = {
        text: messageText,
        sender: 'Вы',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    saveMessage(message);
    addMessageToDOM(message);
    input.value = ''; // Очистка поля ввода после отправки
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
}

function saveMessage(message) {
    let messages = JSON.parse(localStorage.getItem('messages')) || [];

    // Добавляем новое сообщение
    messages.push(message);

    // Сохраняем обновленные данные обратно в localStorage
    localStorage.setItem('messages', JSON.stringify(messages));
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.forEach(addMessageToDOM);
}

function addMessageToDOM(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message-container');

    const senderElement = document.createElement('div');
    senderElement.classList.add('message-sender');
    senderElement.textContent = message.sender;

    const textElement = document.createElement('div');
    textElement.classList.add('message-text');
    textElement.textContent = message.text;

    const timeElement = document.createElement('div');
    timeElement.classList.add('message-time');
    timeElement.textContent = message.time;

    messageElement.appendChild(senderElement);
    messageElement.appendChild(textElement);
    messageElement.appendChild(timeElement);

    messagesDiv.appendChild(messageElement);

    // Прокрутка вниз для отображения последнего сообщения
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

let menuOpen = false;
let attachFile = false;
let divMenu = null;
let divAttachFile = null;

// Переключение основного меню
headerMenu?.addEventListener("click", toggleMenu);

function toggleMenu() {
    menuOpen ? closeMenu() : openMenu();
}

function openMenu() {
    divMenu = document.createElement('div');
    divMenu.classList.add('menu');
    divMenu.innerHTML = `<ul class="menu_list">
                    <li class="menu_item"><button>Info</button></li>
                    <li class="menu_item"><button>Mute</button></li>
                    <li class="menu_item"><button id="clear-local-storage">Clear localStorage</button></li>
                </ul>`;
    headerMenu.appendChild(divMenu);

    document.addEventListener('click', handleClickOutsideMenu);
    document.getElementById('clear-local-storage').addEventListener('click', clearLocalStorage);
    menuOpen = true;
}

function closeMenu() {
    if (divMenu) {
        headerMenu.removeChild(divMenu);
        divMenu = null;
        document.removeEventListener('click', handleClickOutsideMenu);
        menuOpen = false;
    }
}

function handleClickOutsideMenu(event) {
    if (!divMenu.contains(event.target) && !headerMenu.contains(event.target)) {
        closeMenu();
    }
}

function clearLocalStorage() {
    localStorage.clear();
    clearMessagesFromDOM();
    loadMessages();
}

function clearMessagesFromDOM() {
    messagesDiv.innerHTML = '';
}

// Переключение меню прикрепления файлов
attachButton?.addEventListener('click', toggleAttach);

function toggleAttach(event) {
    event.preventDefault(); // Чтобы не отправлялась форма при нажатии на кнопку прикрепления
    attachFile ? closeAttach() : openAttach();
}

function openAttach() {
    divAttachFile = document.createElement('div');
    divAttachFile.classList.add('attach_container');
    divAttachFile.innerHTML = `
        <ul class="attach_list">
            <li class="attach_item"><button id="photoVideo">Photo or video</button></li>
            <li class="attach_item"><button id="gallery">Choose from gallery</button></li>
            <li class="attach_item"><button id="file">File</button></li>
        </ul>
    `;
    attachButton.appendChild(divAttachFile);

    document.addEventListener('click', handleClickOutsideAttach);
    document.getElementById('photoVideo').addEventListener('click', () => fileInput.click());
    document.getElementById('gallery').addEventListener('click', () => fileInput.click());
    document.getElementById('file').addEventListener('click', () => fileInput.click());

    attachFile = true;
}

function closeAttach() {
    if (divAttachFile) {
        attachButton.removeChild(divAttachFile);
        divAttachFile = null;
        document.removeEventListener('click', handleClickOutsideAttach);
        attachFile = false;
    }
}

function handleClickOutsideAttach(event) {
    if (divAttachFile && !divAttachFile.contains(event.target) && !attachButton.contains(event.target)) {
        closeAttach();
    }
}

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*,video/*'; 
fileInput.style.display = 'none';

// Обработка загрузки файлов
fileInput.addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const fileUrl = e.target.result;
            addFileToChat(fileUrl, file.name);
        };
        reader.readAsDataURL(file);
    }
}

function addFileToChat(fileUrl, fileName) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message-container');

    const textElement = document.createElement('div');
    textElement.classList.add('message-text');
    textElement.innerHTML = `<img src="${fileUrl}" alt="${fileName}" class="attached-image">`;

    messageElement.appendChild(textElement);
    messagesDiv.appendChild(messageElement);

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
