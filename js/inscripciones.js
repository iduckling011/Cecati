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
