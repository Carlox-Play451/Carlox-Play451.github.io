// Expancion de imagenes
const images = document.querySelectorAll('.swiper-slide img');
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

images.forEach(image => {
  image.addEventListener('click', e => {
   
    lightbox.innerHTML = '';
    // Muestra el lightbox
    lightbox.style.display = 'flex';
    
    // Crear la imagen ampliada dentro del lightbox
    const img = document.createElement('img');
    img.src = image.src;
    lightbox.appendChild(img);
  });
});

// Ocultar el lightbox al hacer clic fuera de la imagen
lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});
