
// Expansión de imágenes
const images = document.querySelectorAll('.swiper-slide img');
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

let currentImageIndex = 0;

// Crear los botones de navegación
const prevButton = document.createElement('button');
prevButton.classList.add('nav-button', 'prev');
prevButton.innerHTML = '❮'; // Puedes cambiar el símbolo si prefieres otro

const nextButton = document.createElement('button');
nextButton.classList.add('nav-button', 'next');
nextButton.innerHTML = '❯'; // Puedes cambiar el símbolo si prefieres otro

lightbox.appendChild(prevButton);
lightbox.appendChild(nextButton);

images.forEach((image, index) => {
  image.addEventListener('click', () => {
    currentImageIndex = index;
    showImage(currentImageIndex);
    lightbox.style.display = 'flex';
  });
});

// Función para mostrar la imagen en el lightbox
function showImage(index) {
  lightbox.innerHTML = ''; // Limpia el lightbox
  const img = document.createElement('img');
  img.src = images[index].src;
  lightbox.appendChild(img);

  // Agrega los botones nuevamente
  lightbox.appendChild(prevButton);
  lightbox.appendChild(nextButton);
}

// Botón para imagen anterior
prevButton.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  showImage(currentImageIndex);
});

// Botón para imagen siguiente
nextButton.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  showImage(currentImageIndex);
});

// Ocultar el lightbox al hacer clic fuera de la imagen
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});