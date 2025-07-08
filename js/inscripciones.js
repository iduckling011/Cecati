document.getElementById('form-inscripcion').addEventListener('submit', async e => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const datos = Object.fromEntries(formData.entries());

  const response = await fetch('https://inscripciones-cecati.onrender.com/api/inscribir', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });

  const result = await response.json();
  alert(result.mensaje || 'Formulario enviado');
});
