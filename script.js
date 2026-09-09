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
// ENVÍO DE FORMULARIO Y NOTIFICACIÓN CUSTOM
// ==========================================
const formContacto = document.querySelector('#contacto form');
const toast = document.getElementById('toast-notification');
const toastMessage = document.getElementById('toast-message');
const toastIcon = document.getElementById('toast-icon');

function mostrarNotificacion(mensaje, esError = false) {
  toastMessage.textContent = mensaje;
  toastIcon.textContent = esError ? '⚠️' : '✨';
  
  if (esError) {
    toast.classList.add('error');
  } else {
    toast.classList.remove('error');
  }

  // Muestra la notificación con animación
  toast.classList.remove('hidden');

  // Oculta la notificación automáticamente tras 5 segundos
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 5000);
}

if (formContacto) {
  formContacto.addEventListener('submit', async (e) => {
    e.preventDefault();

    const button = formContacto.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    const formData = new FormData(formContacto);

    button.textContent = 'Enviando...';
    button.disabled = true;

    try {
      const response = await fetch(formContacto.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        mostrarNotificacion('¡Gracias por tu mensaje! La consulta fue enviada con éxito.');
        formContacto.reset();
      } else {
        mostrarNotificacion('Ocurrió un inconveniente al enviar la consulta. Intentá nuevamente.', true);
      }
    } catch (error) {
      mostrarNotificacion('Error de conexión. Por favor, verifica tu red.', true);
    } finally {
      button.textContent = originalText;
      button.disabled = false;
    }
  });
}