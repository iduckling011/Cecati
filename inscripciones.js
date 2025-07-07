document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.navbar-toggle');
  const menu = document.querySelector('.navbar-links');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('show');
    });
  }

  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
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
      const res = await fetch('https://inscripciones-cecati.onrender.com/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      alert(data.message || '✅ Inscripción enviada correctamente.');
      form.reset();
    } catch (err) {
      alert('❌ Error al enviar la inscripción');
      console.error(err);
    }
  });
});

// Para que el curso se ponga automático
  window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const curso = params.get('curso');

    if (curso) {
      const select = document.getElementById('curso');
      const opciones = Array.from(select.options);
      const match = opciones.find(opt => opt.value.toLowerCase() === curso.toLowerCase());

      if (match) {
        select.value = match.value;
      }
    }
  });

  export default router;

