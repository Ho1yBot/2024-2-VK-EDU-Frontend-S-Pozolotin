import { clearLocalStorage } from './storage';
import { getCurrentChat } from './fileUpload'

export function Header() {
    const header = document.createElement('div');
    header.classList.add('header', 'center');

    const backButton = `<button class="header_burger-menu"><img src="./static/images/burger-menu.svg" alt="Кнопка меню"></button>`;
    const userInfo = `
        <button class="header_title">
            <div class="header_title-text">Messanger</div>
        </button>`;
    const navButtons = `
        <nav class="header_nav">
            <button class="header_search"><img src="./static/images/search-icon.svg" alt="Search"></button>
            <button id="menu-button" style="display: none;"><img src="./static/images/menu-dots.svg" alt="Меню"></button>
            <div id="menu-container" class="menu-container hidden"> 
                <ul class="menu_list">
                    <li class="menu_item"><button>Info</button></li>
                    <li class="menu_item"><button>Mute</button></li>
                    <li class="menu_item"><button id="clear-local-storage">Clear messages</button></li>
                </ul>
            </div>
        </nav>`;

    header.innerHTML = backButton + userInfo + navButtons;

    const menuButton = header.querySelector('#menu-button');
    const menuContainer = header.querySelector('#menu-container');
    const clearStorageButton = header.querySelector('#clear-local-storage');

    // Обработчик открытия/закрытия меню
    menuButton.addEventListener('click', () => {
        menuContainer.classList.toggle('hidden'); // Открытие/закрытие меню
    });

    // Закрытие меню при клике вне его области
    document.addEventListener('click', (event) => {
        if (!menuButton.contains(event.target) && !menuContainer.contains(event.target)) {
            menuContainer.classList.add('hidden'); // Закрываем меню, если клик был вне его области
        }
    });

    const chatId = getCurrentChat();
    // Обработчик кнопки очистки локального хранилища
    clearStorageButton.addEventListener('click', () => {
        clearLocalStorage(chatId);
        clearMessagesFromDOM();
        menuContainer.classList.add('hidden'); // Закрываем меню после очистки
    });

    return header;
}

// Функция очистки сообщений из DOM
function clearMessagesFromDOM() {
    const messagesDiv = document.querySelector('.messages-container'); // Здесь указать точный ID контейнера с сообщениями
    if (messagesDiv) {
        messagesDiv.innerHTML = '';
    }
}
