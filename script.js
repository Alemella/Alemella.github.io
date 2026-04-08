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

    // Envio de formulario de contacto
    const formulariosContacto = document.querySelectorAll('.contacto__formulario[data-contact-form]');

    formulariosContacto.forEach((formulario) => {
        formulario.addEventListener('submit', async function(evento) {
            evento.preventDefault();

            const estado = formulario.querySelector('.contacto__estado');
            const botonEnviar = formulario.querySelector('button[type="submit"]');
            const endpointAjax = 'https://formsubmit.co/ajax/alejandros.mella5@gmail.com';

            if (estado) {
                estado.textContent = 'Enviando mensaje...';
                estado.className = 'contacto__estado';
            }

            if (botonEnviar) {
                botonEnviar.disabled = true;
            }

            try {
                const respuesta = await fetch(endpointAjax, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json'
                    },
                    body: new FormData(formulario)
                });

                if (!respuesta.ok) {
                    throw new Error('No fue posible completar el envio por AJAX.');
                }

                const datos = await respuesta.json();
                const exito = datos.success === true || datos.success === 'true';

                if (!exito) {
                    throw new Error('El servicio de correo no confirmo el envio.');
                }

                formulario.reset();

                if (estado) {
                    estado.textContent = 'Mensaje enviado correctamente. Te respondere pronto.';
                    estado.className = 'contacto__estado contacto__estado--ok';
                }
            } catch (error) {
                if (estado) {
                    estado.textContent = 'No se pudo enviar el mensaje. Intentalo nuevamente en unos minutos.';
                    estado.className = 'contacto__estado contacto__estado--error';
                }
            } finally {
                if (botonEnviar) {
                    botonEnviar.disabled = false;
                }
            }
        });
    });
});

// ...existing code...