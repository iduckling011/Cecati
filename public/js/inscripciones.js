document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Detectar si estamos en contacto o inscripción por los campos
    if (form.mensaje) {
      // Contacto
      const data = {
        nombre: form.nombre.value,
        correo: form.correo.value,
        mensaje: form.mensaje.value
      };

      try {
        const res = await fetch('/api/mensajes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await res.json();
        alert(result.message || 'Mensaje enviado');
        form.reset();
      } catch (err) {
        alert('❌ Error al enviar el mensaje');
      }

    } else {
      // Inscripción
      const data = {
        nombre: form.nombre.value,
        curp: form.curp.value,
        fecha_nacimiento: form.fecha_nacimiento.value,
        sexo: form.sexo.value,
        telefono: form.telefono.value,
        correo: form.correo.value,
        domicilio: form.domicilio.value,
        municipio: form.municipio.value,
        estado: form.estado.value,
        curso: form.curso.value,
        escolaridad: form.escolaridad.value,
        difusion: form.difusion.value
      };

      try {
        const res = await fetch('/api/contacto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await res.json();
        alert(result.message || 'Inscripción enviada');
        form.reset();
      } catch (err) {
        alert('❌ Error al enviar inscripción');
      }
    }
  });
});
