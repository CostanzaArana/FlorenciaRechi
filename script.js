// ==========================================
// 1. SCROLL SUAVE (Lenis)
// ==========================================
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Integra los enlaces internos de la página con el scroll de Lenis
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#') {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        lenis.scrollTo(targetElement);
      }
    }
  });
});

// ==========================================
// 2. ACORDEÓN DE PREGUNTAS FRECUENTES (<details>)
// Cierra los demás acordeones al abrir uno nuevo
// ==========================================
const detailsElements = document.querySelectorAll('main details');

detailsElements.forEach((targetDetail) => {
  targetDetail.addEventListener('toggle', () => {
    if (targetDetail.open) {
      detailsElements.forEach((detail) => {
        if (detail !== targetDetail) {
          detail.removeAttribute('open');
        }
      });
    }
  });
});

// ==========================================
// 3. CAPTURA Y MANEJO DEL FORMULARIO DE CONTACTO
// ==========================================
const formContacto = document.querySelector('#contacto form');

if (formContacto) {
  formContacto.addEventListener('submit', (e) => {
    e.preventDefault();

    const button = formContacto.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    button.textContent = 'Enviando...';
    button.disabled = true;

    setTimeout(() => {
      alert('¡Gracias por tu mensaje! Me pondré en contacto a la brevedad.');
      formContacto.reset();
      button.textContent = originalText;
      button.disabled = false;
    }, 1200);
  });
}