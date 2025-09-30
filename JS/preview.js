<<<<<<< HEAD
// =========================================================================
// LÓGICA DE LIGHTBOX OPTIMIZADA
// =========================================================================

=======

// Expansión de imágenes
>>>>>>> 82f46d189336e20821b8a0925402f5778a66e189
const images = document.querySelectorAll('.swiper-slide img');
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

let currentImageIndex = 0;

<<<<<<< HEAD
// 1. CREACIÓN DE ELEMENTOS ESTÁTICOS (solo se crean una vez)

const prevButton = document.createElement('button');
prevButton.classList.add('nav-button', 'prev');
prevButton.innerHTML = '❮'; 

const nextButton = document.createElement('button');
nextButton.classList.add('nav-button', 'next');
nextButton.innerHTML = '❯'; 

const displayImage = document.createElement('img');
displayImage.id = 'lightbox-display-img'; // ID crucial para el CSS

// 2. MONTAJE: Agregar todos los elementos estáticos al lightbox
lightbox.appendChild(prevButton);
lightbox.appendChild(displayImage); 
lightbox.appendChild(nextButton);

// Función para mostrar la imagen en el lightbox (optimizado)
function showImage(index) {
    // Solo cambiamos el src del elemento de imagen que ya existe
    displayImage.src = images[index].src; 
}

// 3. INICIALIZACIÓN: Click en la miniatura
images.forEach((image, index) => {
    image.addEventListener('click', () => {
        currentImageIndex = index;
        showImage(currentImageIndex);
        
        // Abrir: Usamos clase CSS y bloqueamos el scroll
        lightbox.classList.add('is-active'); 
        document.body.style.overflow = 'hidden'; 
    });
});

// 4. NAVEGACIÓN

// Botón para imagen anterior
prevButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que se cierre al hacer clic en el botón
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
});

// Botón para imagen siguiente
nextButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que se cierre al hacer clic en el botón
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
});

// 5. CERRAR

// Función de cierre reutilizable
function closeLightbox() {
    lightbox.classList.remove('is-active');
    document.body.style.overflow = ''; // Devolvemos el scroll
}

// Ocultar el lightbox al hacer clic fuera de la imagen
lightbox.addEventListener('click', (e) => {
    // Si el evento ocurrió directamente en el contenedor #lightbox (el fondo)
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Cierre con la tecla Escape (Mejora de accesibilidad)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
        closeLightbox();
    }
=======
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
>>>>>>> 82f46d189336e20821b8a0925402f5778a66e189
});