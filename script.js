// ...existing code...

document.addEventListener('DOMContentLoaded', function() {
    // Modo oscuro
    const btnDark = document.getElementById('toggle-dark');

    function actualizarEstadoBotonTema() {
        const enModoOscuro = document.body.classList.contains('dark-mode');
        btnDark.setAttribute('aria-pressed', String(enModoOscuro));
        btnDark.setAttribute('aria-label', enModoOscuro ? 'Activar modo claro' : 'Activar modo oscuro');
    }

    if (btnDark) {
        actualizarEstadoBotonTema();
        btnDark.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            actualizarEstadoBotonTema();
        });
    }

    // Navegación de proyectos
    const btnPrev = document.querySelector('.proyectos__btn--prev');
    const btnNext = document.querySelector('.proyectos__btn--next');
    const proyectosItems = document.querySelectorAll('.proyectos__item');
    let indexActual = 0;

    function mostrarProyecto(indice) {
        proyectosItems.forEach((item, i) => {
            item.style.display = i === indice ? 'flex' : 'none';
        });
        const infoProyecto = document.querySelector('.proyectos__info');
        if (infoProyecto) {
            infoProyecto.dataset.index = indice;
        }
    }

    if (btnPrev && proyectosItems.length > 1) {
        btnPrev.addEventListener('click', function() {
            indexActual = (indexActual - 1 + proyectosItems.length) % proyectosItems.length;
            mostrarProyecto(indexActual);
        });
    }

    if (btnNext && proyectosItems.length > 1) {
        btnNext.addEventListener('click', function() {
            indexActual = (indexActual + 1) % proyectosItems.length;
            mostrarProyecto(indexActual);
        });
    }

    // Inicializar mostrando el primer proyecto
    if (proyectosItems.length > 0) {
        mostrarProyecto(0);
    }
});

// ...existing code...