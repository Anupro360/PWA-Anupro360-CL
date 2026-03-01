document.getElementById('year').textContent = new Date().getFullYear();

// PWA: Lógica de Instalación Dinámica
let deferredPrompt;
const pwaCard = document.getElementById('pwa-install-banner');
const btnInstall = document.getElementById('btn-install');
const btnClose = document.getElementById('btn-close-pwa');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Solo mostramos el banner si no ha sido cerrado manualmente
    if (!localStorage.getItem('pwa_banner_closed')) {
        pwaCard.style.display = 'flex';
    }
});

btnInstall?.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                if (typeof gtag === 'function') gtag('event', 'pwa_instalada_exito');
            }
            pwaCard.style.display = 'none';
            deferredPrompt = null;
        });
    }
});

btnClose?.addEventListener('click', () => {
    pwaCard.style.display = 'none';
    // Guardamos en el navegador que el usuario cerró el banner
    localStorage.setItem('pwa_banner_closed', 'true');
});

// Formulario de Contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (typeof gtag === 'function') {
            gtag('event', 'lead_generado', { 'tipo': 'form_contacto' });
        }
        alert('¡Mensaje enviado con éxito! Nos contactaremos pronto.');
        contactForm.reset();
    });
}

// Registro del Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW error', err));
    });
}