import './index.css';
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

// Загрузка сообщений при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadMessagesToDOM();

    // События формы отправки сообщений
    const form = document.querySelector('form');
    const input = document.querySelector('.form-input');

    if (form && input) {
        form.addEventListener('submit', handleSubmit);
        form.addEventListener('keypress', handleKeyPress);
    } 
});

// Функция загрузки сообщений в DOM
function loadMessagesToDOM() {
    const messages = loadMessages();
    messages.forEach(addMessageToDOM);
}

// --- Логика меню ---
let menuOpen = false;
let divMenu = null;

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

