export function FloatingButton() {
    const button = document.createElement('button');
    button.classList.add('floating-button');
    button.innerHTML = '<img src="./static/images/create-chat.svg" alt="Создать чат">';
    button.onclick = () => {
        // Реализация логики
    };
    
    return button;
}
