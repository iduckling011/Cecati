document.addEventListener('DOMContentLoaded', () => {
  // 📝 Inscripciones → /api/contacto
  const inscripcionForm = document.getElementById('form-inscripcion');
  if (inscripcionForm) {
    inscripcionForm.addEventListener('submit', async e => {
      e.preventDefault();

      const datos = Object.fromEntries(new FormData(inscripcionForm).entries());

      try {
        const res = await fetch('https://cecati-dkvx.onrender.com/api/contacto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });

        const result = await res.json();
        alert(result.message || '✅ Inscripción enviada correctamente');
        inscripcionForm.reset();
      } catch (err) {
        console.error('❌ Error al enviar inscripción:', err);
        alert('Hubo un problema al enviar la inscripción.');
      }
    });
  }

  // 📬 Mensaje → /api/mensaje
  const contactoForm = document.getElementById('form-contacto');
  if (contactoForm) {
    contactoForm.addEventListener('submit', async e => {
      e.preventDefault();

      const datos = Object.fromEntries(new FormData(contactoForm).entries());

      try {
        const res = await fetch('https://cecati-dkvx.onrender.com/api/mensaje', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });

        const result = await res.json();
        alert(result.message || '✅ Mensaje enviado correctamente');
        contactoForm.reset();
      } catch (err) {
        console.error('❌ Error al enviar mensaje:', err);
        alert('Hubo un problema al enviar el mensaje.');
      }
    });
  }

  // 🎛️ Menú desplegable
  const toggle = document.querySelector('.navbar-toggle');
  const menu = document.querySelector('.navbar-links');
  toggle?.addEventListener('click', () => menu?.classList.toggle('show'));
});
