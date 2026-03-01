document.getElementById('year').textContent = new Date().getFullYear();

// --- LÓGICA DE INSTALACIÓN PWA MEJORADA ---
let deferredPrompt;
const pwaCard = document.getElementById('pwa-install-card');
const btnInstall = document.getElementById('btn-install');
const btnClose = document.getElementById('btn-close-pwa');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Solo mostrar si no se cerró en esta sesión
    if (!localStorage.getItem('pwa_dismissed')) {
        pwaCard.style.display = 'flex';
    }
});

btnInstall?.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                pwaCard.style.display = 'none';
            }
            deferredPrompt = null;
        });
    }
});

btnClose?.addEventListener('click', () => {
    pwaCard.style.display = 'none';
    localStorage.setItem('pwa_dismissed', 'true');
});

// Formulario de Contacto + Rastreo Simple
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Mensaje enviado con éxito! Nos contactaremos pronto.');
        contactForm.reset();
    });
}

// Registro del Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => console.log('Error SW', err));
    });
}