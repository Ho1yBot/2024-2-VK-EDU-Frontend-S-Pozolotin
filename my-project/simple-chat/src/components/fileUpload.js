export const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.style.display = 'none';

export function initFileUpload() {
    fileInput.addEventListener('change', handleFileUpload);
}

export function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        console.log('Файл загружен:', file.name);
        // Здесь можно добавить логику обработки файла
    }
}
