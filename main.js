document.getElementById('year').textContent = new Date().getFullYear();

// --- LÓGICA DE INSTALACIÓN PWA ---
let deferredPrompt;
const pwaCard = document.getElementById('pwa-install-card');
const btnInstall = document.getElementById('btn-install');
const btnClose = document.getElementById('btn-close-pwa');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Solo mostramos si NO se cerró en esta sesión
    if (!localStorage.getItem('pwa_hidden')) {
        pwaCard.style.display = 'flex';
    }
});

btnInstall?.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            pwaCard.style.display = 'none';
        }
        deferredPrompt = null;
    }
});

btnClose?.addEventListener('click', () => {
    pwaCard.style.display = 'none';
    localStorage.setItem('pwa_hidden', 'true');
});

// Formulario de Contacto
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Mensaje enviado con éxito! Nos contactaremos pronto.');
    e.target.reset();
});

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => console.log('Error SW', err));
    });
}