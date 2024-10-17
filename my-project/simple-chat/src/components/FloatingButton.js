export function FloatingButton() {
    const button = document.createElement('button');
    button.classList.add('floating-button');
    button.innerHTML = '<img src="./static/images/create-chat.svg" alt="Создать чат">';
    button.onclick = () => {
        // Logic to create a new chat or navigate
    };
    
    return button;
}
