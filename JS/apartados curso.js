function openTab(tabName) {
    // Ocultar todo el contenido de las pestañas
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');
    // Mostrar el contenido de la pestaña seleccionada
    document.getElementById(tabName).style.display = 'block';
  }  