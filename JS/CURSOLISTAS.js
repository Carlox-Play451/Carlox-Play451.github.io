document.addEventListener('DOMContentLoaded', () => {
    // === SELECTORES ===
    const filtrosOpciones = document.querySelector('.filtros-opciones');
    const inputBusqueda = document.getElementById('inputBusqueda');
    const cursos = document.querySelectorAll('.caja-curso');
    const contenedorCursos = document.getElementById('listaCursos');
    const botonLimpiar = document.getElementById('limpiarFiltros');
    
    // === FUNCIÓN DE OPTIMIZACIÓN: DEBOUNCE ===
    function debounce(func, delay = 300) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    // === LÓGICA DE FILTRADO Y BÚSQUEDA ===
    function aplicarFiltros() {
        const filtrosActivos = {};
        const textoBusqueda = inputBusqueda.value.toLowerCase().trim();
        let hayFiltroActivo = false;

        // 1. Recopilar filtros activos
        document.querySelectorAll('.filtros-opciones input[type="checkbox"]:checked').forEach(checkbox => {
            const grupo = checkbox.dataset.grupo;
            const valor = checkbox.value;

            if (!filtrosActivos[grupo]) {
                filtrosActivos[grupo] = [];
            }
            filtrosActivos[grupo].push(valor);
            hayFiltroActivo = true;
        });
        
        // Si no hay filtros activos ni texto de búsqueda, todos deberían ser visibles
        if (Object.keys(filtrosActivos).length === 0 && textoBusqueda === '') {
            // Mostrar todos y salir de la función
            cursos.forEach(curso => curso.classList.remove('oculto'));
            return;
        }

        const gruposFiltrados = Object.keys(filtrosActivos);
        const cursosVisibles = [];
        const cursosOcultos = [];

        // 2. Iterar sobre los cursos para determinar visibilidad y clasificarlos
        cursos.forEach((curso) => {
            let cumpleFiltros = true;
            
            // --- Criterio A: Búsqueda por Texto ---
            const titulo = curso.querySelector('h4').textContent.toLowerCase();
            const descripcion = curso.querySelector('p')?.textContent.toLowerCase() || ''; 
            
            if (textoBusqueda !== '' && !titulo.includes(textoBusqueda) && !descripcion.includes(textoBusqueda)) {
                cumpleFiltros = false;
            }

            // --- Criterio B: Filtrado por Checkboxes ---
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

            // --- Clasificación ---
            if (cumpleFiltros) {
                cursosVisibles.push(curso);
            } else {
                cursosOcultos.push(curso);
            }
        });
        
        // 3. LÓGICA DE MOVIMIENTO AL FRENTE (EL CAMBIO SOLICITADO)
        
        // Mover los cursos visibles al principio y mostrar (se insertan en orden inverso al forEach)
        // Usamos .forEach en inverso o insertBefore para mantener el orden, pero .prepend funciona bien para mover al frente.
        cursosVisibles.reverse().forEach(curso => {
            // 1. Mover al principio del contenedor (lo que estaba al final ahora va primero)
            contenedorCursos.prepend(curso); 
            // 2. Mostrar la tarjeta
            curso.classList.remove('oculto');
        });

        // Asegurar que los cursos ocultos se mantengan al final y ocultos
        cursosOcultos.forEach(curso => {
            // 1. Ocultar la tarjeta
            curso.classList.add('oculto');
            // 2. Mover al final (mantiene el DOM limpio, ya que ocupan 0 espacio)
            contenedorCursos.appendChild(curso); 
        });
    }

    // === LISTENERS ===

    // 1. Delegado de Eventos para Checkboxes
    filtrosOpciones.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            aplicarFiltros();
        }
    });
    
    // 2. Búsqueda Instantánea con Debounce
    const debouncedFiltros = debounce(aplicarFiltros, 300); 

    inputBusqueda.addEventListener('input', debouncedFiltros);
    
    // 3. Limpiar Filtros
    botonLimpiar.addEventListener('click', (e) => {
        e.preventDefault(); 
        document.querySelectorAll('.filtros-opciones input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        inputBusqueda.value = ''; 
        aplicarFiltros(); // Vuelve a mostrar todos
    });
    
    // Inicializar: Asegura que el estado inicial (todos visibles) se muestre correctamente
    aplicarFiltros();
});