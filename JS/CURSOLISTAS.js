document.addEventListener('DOMContentLoaded', () => {
    // === SELECTORES ===
    const filtrosOpciones = document.querySelector('.filtros-opciones');
    const inputBusqueda = document.getElementById('inputBusqueda'); // Usamos el ID
    const cursos = document.querySelectorAll('.caja-curso');
    const botonLimpiar = document.getElementById('limpiarFiltros');
    const botonVerMas = document.querySelector('.boton-ver-mas');
    
    // Configuración de paginación
    const CURSOS_POR_DEFECTO = 6;
    let cursosVisibles = CURSOS_POR_DEFECTO; 
    
    // === FUNCIÓN DE OPTIMIZACIÓN: DEBOUNCE ===
    // Retrasa la ejecución de una función para que no se ejecute con demasiada frecuencia
    function debounce(func, delay = 300) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    // === LÓGICA DE FILTRADO, BÚSQUEDA Y PAGINACIÓN ===
    function aplicarFiltros() {
        const filtrosActivos = {};
        const textoBusqueda = inputBusqueda.value.toLowerCase().trim();

        // 1. Recopilar filtros activos
        document.querySelectorAll('.filtros-opciones input[type="checkbox"]:checked').forEach(checkbox => {
            const grupo = checkbox.dataset.grupo;
            const valor = checkbox.value;

            if (!filtrosActivos[grupo]) {
                filtrosActivos[grupo] = [];
            }
            filtrosActivos[grupo].push(valor);
        });
        
        const gruposFiltrados = Object.keys(filtrosActivos);
        let cursosVisiblesEnTotal = 0; 

        // 2. Iterar sobre los cursos para determinar visibilidad
        cursos.forEach((curso) => {
            let cumpleFiltros = true;
            
            // --- Criterio A: Búsqueda por Texto ---
            const titulo = curso.querySelector('h4').textContent.toLowerCase();
            const descripcion = curso.querySelector('p')?.textContent.toLowerCase() || ''; 
            
            // Si hay texto de búsqueda y el curso NO lo contiene, falla el filtro
            if (textoBusqueda !== '' && !titulo.includes(textoBusqueda) && !descripcion.includes(textoBusqueda)) {
                cumpleFiltros = false;
            }

            // --- Criterio B: Filtrado por Checkboxes (solo si pasó la búsqueda) ---
            if (cumpleFiltros) {
                for (const grupo of gruposFiltrados) {
                    const filtrosDelGrupo = filtrosActivos[grupo]; 
                    const valorCurso = curso.dataset[grupo];       
                    
                    if (filtrosDelGrupo.length > 0) {
                        let cumpleGrupo = false;

                        if (valorCurso) {
                            const valoresCursoArray = valorCurso.split(' ');
                            cumpleGrupo = valoresCursoArray.some(valor => filtrosDelGrupo.includes(valor));
                        }
                        
                        if (!cumpleGrupo) {
                            cumpleFiltros = false;
                            break; 
                        }
                    }
                }
            }

            // --- Criterio C: Paginación ---
            if (cumpleFiltros) {
                cursosVisiblesEnTotal++; 
                
                if (cursosVisiblesEnTotal <= cursosVisibles) {
                    curso.classList.remove('oculto');
                } else {
                    curso.classList.add('oculto');
                }
            } else {
                // Si falla cualquier filtro o búsqueda, el curso se oculta
                curso.classList.add('oculto');
            }
        });

        // 3. Actualizar botón "Ver Más"
        if (cursosVisiblesEnTotal > cursosVisibles) {
            botonVerMas.style.display = 'block';
        } else {
            botonVerMas.style.display = 'none';
        }
    }

    // === LISTENERS (CON DEBOUNCE PARA LA BÚSQUEDA) ===

    // 1. Delegado de Eventos para Checkboxes
    filtrosOpciones.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            cursosVisibles = CURSOS_POR_DEFECTO; // Resetear la paginación
            aplicarFiltros();
        }
    });
    
    // 2. Búsqueda Instantánea con Debounce (Optimizado)
    const debouncedFiltros = debounce(() => {
        cursosVisibles = CURSOS_POR_DEFECTO;
        aplicarFiltros();
    }, 300); // 300ms de retraso

    inputBusqueda.addEventListener('input', debouncedFiltros);
    
    // 3. Limpiar Filtros
    botonLimpiar.addEventListener('click', (e) => {
        e.preventDefault(); 
        document.querySelectorAll('.filtros-opciones input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        inputBusqueda.value = ''; // Limpiar el campo de búsqueda
        cursosVisibles = CURSOS_POR_DEFECTO;
        aplicarFiltros();
    });
    
    // 4. Botón "Ver Más"
    botonVerMas.addEventListener('click', () => {
        cursosVisibles += CURSOS_POR_DEFECTO; 
        aplicarFiltros(); 
    });

    // Inicializar
    aplicarFiltros();
});