document.getElementById('year').textContent = new Date().getFullYear();

// Menú Móvil
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
if (burger) {
    burger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.right = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#003B5C';
        navLinks.style.padding = '20px';
    });
}

// Rastreo GA4 Aula Virtual
document.querySelectorAll('a[href*="classroom.google.com"]').forEach(link => {
    link.addEventListener('click', () => {
        if (typeof gtag === 'function') {
            gtag('event', 'acceso_aula_virtual', { 'metodo': 'nav_principal' });
        }
    });
});

// PWA: Banner de Instalación
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('pwa-install-banner').style.display = 'flex';
});

document.getElementById('btn-install')?.addEventListener('click', () => {
    document.getElementById('pwa-install-banner').style.display = 'none';
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted' && typeof gtag === 'function') {
                gtag('event', 'pwa_instalada_exito');
            }
            deferredPrompt = null;
        });
    }
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