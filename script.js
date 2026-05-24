const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const dotsContainer = document.getElementById('dots');
// Variáveis para a funcionalidade de tela cheia
const carousel = document.querySelector('.carousel'); 
const fullscreenToggle = document.getElementById('fullscreen-toggle'); 

let current = 0;

// 1. Criação dos Dots de Navegação
slides.forEach((s, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.dataset.index = i;
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// 2. Funções de Controle
function updateUI() {
    slides.forEach((s, i) => s.setAttribute('aria-hidden', i !== current));
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

function goTo(i) {
    current = (i + slides.length) % slides.length;
    updateUI();
}

// 3. Funções de Tela Cheia
function toggleFullscreen() {
    // Agora 'carousel' está definido
    carousel.classList.toggle('fullscreen'); 
}

// 4. Listeners de Eventos
prev.addEventListener('click', () => goTo(current - 1));
next.addEventListener('click', () => goTo(current + 1));

// Navegação por teclado (setas)
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    else if (e.key === 'ArrowRight') goTo(current + 1);
});

// Listener para o botão de Tela Cheia (agora 'fullscreenToggle' está definido)
fullscreenToggle.addEventListener('click', toggleFullscreen);

// Listener para a tecla ESC sair do modo Tela Cheia
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && carousel.classList.contains('fullscreen')) {
        toggleFullscreen();
    }
});

// Inicia o carrossel no primeiro slide
goTo(0);