// main.js

const toggle = document.querySelector('.navbar-toggle');
const menu = document.querySelector('.navbar-links');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Formulario de inscripción
  const formInscripcion = document.querySelector('form#form-inscripcion');
  if (formInscripcion) {
    formInscripcion.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = {
        nombre: formInscripcion.nombre.value,
        curp: formInscripcion.curp.value,
        fecha_nacimiento: formInscripcion.fecha_nacimiento.value,
        sexo: formInscripcion.sexo.value,
        telefono: formInscripcion.telefono.value,
        correo: formInscripcion.correo.value,
        domicilio: formInscripcion.domicilio.value,
        municipio: formInscripcion.municipio.value,
        estado: formInscripcion.estado.value,
        curso: formInscripcion.curso.value,
        escolaridad: formInscripcion.escolaridad.value,
        difusion: formInscripcion.difusion.value
      };

      try {
        const res = await fetch('https://inscripciones-cecati.onrender.com/api/contacto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const data = await res.json();
        alert(data.message || 'Inscripción enviada');
        formInscripcion.reset();
      } catch (err) {
        alert('❌ Error al enviar la inscripción');
        console.error(err);
      }
    });
  }

  // Formulario de contacto
  const formContacto = document.querySelector('form#form-contacto');
  if (formContacto) {
    formContacto.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = {
        nombre: formContacto.nombre.value,
        correo: formContacto.correo.value,
        mensaje: formContacto.mensaje.value
      };

      try {
        const res = await fetch('https://inscripciones-cecati.onrender.com/api/mensaje', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const data = await res.json();
        alert(data.message || 'Mensaje enviado');
        formContacto.reset();
      } catch (err) {
        alert('❌ Error al enviar el mensaje');
        console.error(err);
      }
    });
  }
});
