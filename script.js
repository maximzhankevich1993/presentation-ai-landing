// ===== ЧАСТИЦЫ =====
(function() {
    var particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (var i = 0; i < 30; i++) {
            var particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }
})();

// ===== ТЁМНАЯ ТЕМА =====
function toggleTheme() {
    var body = document.body;
    var toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    
    if (body.style.getPropertyValue('--bg') === '#ffffff') {
        body.style.setProperty('--bg', '#0f0f1a');
        body.style.setProperty('--text', '#f1f5f9');
        body.style.setProperty('--text-secondary', '#94a3b8');
        body.style.setProperty('--surface', 'rgba(255, 255, 255, 0.03)');
        body.style.setProperty('--glass', 'rgba(255, 255, 255, 0.05)');
        body.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.1)');
        toggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    } else {
        body.style.setProperty('--bg', '#ffffff');
        body.style.setProperty('--text', '#0f172a');
        body.style.setProperty('--text-secondary', '#64748b');
        body.style.setProperty('--surface', 'rgba(0, 0, 0, 0.02)');
        body.style.setProperty('--glass', 'rgba(255, 255, 255, 0.7)');
        body.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.1)');
        toggle.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    }
}

// Загрузка сохранённой темы
(function() {
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        toggleTheme();
    }
})();

// ===== ЧИПСЫ =====
(function() {
    var chips = document.querySelectorAll('.chip');
    chips.forEach(function(chip) {
        chip.addEventListener('click', function() {
            var input = document.getElementById('topicInput');
            if (input) {
                input.value = this.getAttribute('data-topic');
            }
        });
    });
})();

// ===== ГЕНЕРАЦИЯ =====
(function() {
    var loadingMessages = [
        '🤔 Анализирую тему...',
        '📚 Собираю информацию...',
        '💡 Придумываю структуру...',
        '✍️ Пишу текст слайдов...',
        '🖼 Подбираю иллюстрации...',
        '✨ Финальные штрихи...'
    ];

    var generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.onclick = function() {
            var topicInput = document.getElementById('topicInput');
            if (!topicInput) return;
            
            var topic = topicInput.value.trim();
            if (!topic) {
                topicInput.style.border = '2px solid #ef4444';
                setTimeout(function() { topicInput.style.border = ''; }, 500);
                return;
            }
            
            var modal = document.getElementById('loadingModal');
            var loadingText = document.getElementById('loadingText');
            var progressBar = document.getElementById('progressBar');
            
            if (!modal || !loadingText || !progressBar) return;
            
            modal.classList.add('show');
            var step = 0;
            var progress = 0;
            
            loadingText.textContent = loadingMessages[0];
            progressBar.style.width = '0%';
            
            var msgInterval = setInterval(function() {
                step++;
                if (step < loadingMessages.length) {
                    loadingText.textContent = loadingMessages[step];
                }
            }, 1500);
            
            var progressInterval = setInterval(function() {
                progress += 2;
                if (progress <= 90) {
                    progressBar.style.width = progress + '%';
                }
            }, 100);
            
            setTimeout(function() {
                clearInterval(msgInterval);
                clearInterval(progressInterval);
                progressBar.style.width = '100%';
                loadingText.textContent = '✅ Готово!';
                setTimeout(function() { modal.classList.remove('show'); }, 1000);
            }, 5000);
        };
    }
})();

// ===== ENTER В ПОЛЕ ВВОДА =====
(function() {
    var topicInput = document.getElementById('topicInput');
    if (topicInput) {
        topicInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                var generateBtn = document.getElementById('generateBtn');
                if (generateBtn) {
                    generateBtn.click();
                }
            }
        });
    }
})();

// ===== КНОПКА «ОТКРЫТЬ РЕДАКТОР» =====
(function() {
    var navCta = document.querySelector('.nav-cta');
    if (navCta) {
        navCta.onclick = function(e) {
            e.preventDefault();
            alert('Редактор скоро будет доступен! Следите за обновлениями.');
        };
    }
})();