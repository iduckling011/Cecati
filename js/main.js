document.addEventListener('DOMContentLoaded', () => {
  // 📬 FORMULARIO DE CONTACTO
  const contactoForm = document.getElementById('form-contacto');
  if (contactoForm) {
    contactoForm.addEventListener('submit', async e => {
      e.preventDefault();

      const datos = {
        nombre: contactoForm.nombre.value,
        correo: contactoForm.correo.value,
        mensaje: contactoForm.mensaje.value
      };

      try {
        const res = await fetch('https://inscripciones-cecati.onrender.com/api/mensaje', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });

        const result = await res.json();
        alert(result.message || '✅ Mensaje enviado correctamente');
        contactoForm.reset();
      } catch (error) {
        console.error('❌ Error al enviar el mensaje:', error);
        alert('Hubo un problema al enviar tu mensaje.');
      }
    });
  }

  // 📝 FORMULARIO DE INSCRIPCIÓN
  const inscripcionForm = document.getElementById('form-inscripcion');
  if (inscripcionForm) {
    inscripcionForm.addEventListener('submit', async e => {
      e.preventDefault();

      const datos = Object.fromEntries(new FormData(inscripcionForm).entries());

      try {
        const res = await fetch('https://inscripciones-cecati.onrender.com/api/contacto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });

        const result = await res.json();
        alert(result.message || '✅ Inscripción enviada correctamente');
        inscripcionForm.reset();
      } catch (error) {
        console.error('❌ Error al enviar inscripción:', error);
        alert('Hubo un problema al enviar la inscripción.');
      }
    });
  }

  // 🎛️ MENÚ DE NAVEGACIÓN
  const toggle = document.querySelector('.navbar-toggle');
  const menu = document.querySelector('.navbar-links');
  toggle?.addEventListener('click', () => menu?.classList.toggle('show'));
});
