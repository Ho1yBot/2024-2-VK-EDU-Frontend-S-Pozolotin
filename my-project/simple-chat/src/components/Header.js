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
        </nav>`;

    header.innerHTML = backButton + userInfo + navButtons;

    return header;
}
