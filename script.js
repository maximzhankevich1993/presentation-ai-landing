const CONFIG = {
    API_URL: 'http://localhost:3000/api',
    APP_URL: 'http://localhost:5000'
};

const topicInput = document.getElementById('topicInput');
const generateBtn = document.getElementById('generateBtn');
const loadingModal = document.getElementById('loadingModal');
const loadingText = document.getElementById('loadingText');
const progressBar = document.getElementById('progressBar');

const loadingMessages = [
    "🤔 Анализирую тему...",
    "📚 Собираю информацию...",
    "💡 Придумываю структуру...",
    "✍️ Пишу текст слайдов...",
    "🖼 Подбираю иллюстрации...",
    "✨ Финальные штрихи..."
];

let messageInterval;
let progressInterval;

// Чипсы с примерами
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        topicInput.value = chip.getAttribute('data-topic');
    });
});

// Enter в поле ввода
topicInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generatePresentation();
});

// Кнопка генерации
generateBtn.addEventListener('click', generatePresentation);

async function generatePresentation() {
    const topic = topicInput.value.trim();
    
    if (!topic) {
        topicInput.style.border = '2px solid #EF4444';
        setTimeout(() => topicInput.style.border = '', 500);
        return;
    }
    
    showLoadingModal();
    
    try {
        // Имитация генерации (замени на реальный API)
        let progress = 0;
        let messageIndex = 0;
        
        messageInterval = setInterval(() => {
            messageIndex++;
            if (messageIndex < loadingMessages.length) {
                loadingText.textContent = loadingMessages[messageIndex];
            }
        }, 1500);
        
        progressInterval = setInterval(() => {
            progress += 3;
            if (progress <= 90) {
                progressBar.style.width = progress + '%';
            }
        }, 100);
        
        // Ждём 5 секунд и переходим
        setTimeout(() => {
            clearInterval(messageInterval);
            clearInterval(progressInterval);
            progressBar.style.width = '100%';
            loadingText.textContent = '✅ Готово!';
            
            setTimeout(() => {
                window.location.href = CONFIG.APP_URL + '?topic=' + encodeURIComponent(topic);
            }, 500);
        }, 5000);
        
    } catch (error) {
        console.error('Ошибка:', error);
        hideLoadingModal();
        alert('Не удалось создать презентацию. Попробуйте ещё раз.');
    }
}

function showLoadingModal() {
    loadingModal.classList.add('show');
    loadingText.textContent = loadingMessages[0];
    progressBar.style.width = '0%';
    document.body.style.overflow = 'hidden';
}

function hideLoadingModal() {
    loadingModal.classList.remove('show');
    document.body.style.overflow = '';
    clearInterval(messageInterval);
    clearInterval(progressInterval);
}