import './index.css';
// import './styles/chatList.css';
import { saveMessage, loadMessages, clearLocalStorage } from './components/storage';
import { handleFileUpload, fileInput, initFileUpload } from './components/fileUpload';
import { Header } from './components/Header';
import { ChatList } from './components/ChatList';
import { FloatingButton } from './components/FloatingButton';
import { handleSubmit, handleKeyPress, addMessageToDOM } from './components/message';


// Загружаем компоненты в DOM
const headerComponent = document.getElementById('header-component');
const chatListComponent = document.getElementById('chat-list-component');
const floatingButtonComponent = document.getElementById('floating-button-component');

// Добавляем компоненты
headerComponent.appendChild(Header());
chatListComponent.appendChild(ChatList());
floatingButtonComponent.appendChild(FloatingButton());

// Загрузка сообщений из локального хранилища
loadMessages();

// События формы отправки сообщений
const form = document.querySelector('form');
const input = document.querySelector('.form-input');

form.addEventListener('submit', handleSubmit);
form.addEventListener('keypress', handleKeyPress);


// Загрузка сообщений при загрузке страницы
function loadMessagesToDOM() {
    const messages = loadMessages();
    messages.forEach(addMessageToDOM);
}

// --- Логика меню ---
let menuOpen = false;
let attachFile = false;
let divMenu = null;
let divAttachFile = null;

// Открытие/закрытие основного меню
function toggleMenu() {
    menuOpen ? closeMenu() : openMenu();
}

function openMenu() {
    divMenu = document.createElement('div');
    divMenu.classList.add('menu');
    divMenu.innerHTML = `
        <ul class="menu_list">
            <li class="menu_item"><button>Info</button></li>
            <li class="menu_item"><button>Mute</button></li>
            <li class="menu_item"><button id="clear-local-storage">Clear localStorage</button></li>
        </ul>`;
    document.querySelector('.header_menu').appendChild(divMenu);

    document.addEventListener('click', handleClickOutsideMenu);
    document.getElementById('clear-local-storage').addEventListener('click', clearLocalStorageFromDOM);
    menuOpen = true;
}

function closeMenu() {
    if (divMenu) {
        document.querySelector('.header_menu').removeChild(divMenu);
        divMenu = null;
        document.removeEventListener('click', handleClickOutsideMenu);
        menuOpen = false;
    }
}

function handleClickOutsideMenu(event) {
    if (divMenu && !divMenu.contains(event.target) && !document.querySelector('.header_menu').contains(event.target)) {
        closeMenu();
    }
}

function clearLocalStorageFromDOM() {
    clearLocalStorage();
    clearMessagesFromDOM();
    loadMessagesToDOM();
}

// --- Логика прикрепления файлов ---
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
        </ul>`;
    document.querySelector('.attach').appendChild(divAttachFile);

    document.addEventListener('click', handleClickOutsideAttach);
    document.getElementById('photoVideo').addEventListener('click', () => fileInput.click());
    document.getElementById('gallery').addEventListener('click', () => fileInput.click());
    document.getElementById('file').addEventListener('click', () => fileInput.click());

    attachFile = true;
}

function closeAttach() {
    if (divAttachFile) {
        document.querySelector('.attach').removeChild(divAttachFile);
        divAttachFile = null;
        document.removeEventListener('click', handleClickOutsideAttach);
        attachFile = false;
    }
}

function handleClickOutsideAttach(event) {
    if (divAttachFile && !divAttachFile.contains(event.target) && !document.querySelector('.attach').contains(event.target)) {
        closeAttach();
    }
}