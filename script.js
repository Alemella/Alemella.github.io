// ...existing code...

document.addEventListener('DOMContentLoaded', function() {
    // Modo oscuro
    const botonesTema = document.querySelectorAll('[data-theme-toggle]');
    const botonesIdioma = document.querySelectorAll('[data-lang-toggle]');
    const selectoresIdioma = document.querySelectorAll('[data-lang-select]');
    const opcionesIdioma = document.querySelectorAll('[data-lang-option]');
    const navbar = document.querySelector('.navbar');
    const btnMenu = document.getElementById('menu-toggle');
    const navbarLinks = document.getElementById('navbar-links');
    let idiomaActual = localStorage.getItem('portfolio-lang') === 'en' ? 'en' : 'es';

    const textos = {
        es: {
            nav: {
                sobreMi: 'Sobre mi',
                tecnologias: 'Tecnologias',
                aficiones: 'Aficiones',
                proyectos: 'Proyectos',
                contacto: 'Contacto',
                abrirMenu: 'Abrir menu',
                cerrarMenu: 'Cerrar menu'
            },
            tema: {
                activarClaro: 'Activar modo claro',
                activarOscuro: 'Activar modo oscuro'
            },
            idioma: {
                boton: 'Cambiar idioma',
                codigo: 'ES'
            },
            secciones: {
                sobreMiTitulo: 'Sobre mi',
                sobreMiP1: 'Me he desempenado en el desarrollo de sistemas de gestion de compras, ventas y operaciones para servitecas y talleres. Soy desarrollador web full stack, con foco en front-end.',
                sobreMiP2: 'Me motiva combinar creatividad, logica y tecnologia para resolver problemas.',
                sobreMiP3: 'En mi tiempo libre disfruto de los videojuegos, y recientemente he comenzado a explorar su desarrollo.',
                tecnologias: 'Tecnologias',
                aficiones: 'Aficiones',
                aficion1: 'Diseno de interfaces',
                aficion2: 'Resolucion de problemas',
                aficion3: 'Automatizacion de procesos',
                aficion4: 'Videojuegos',
                proyectos: 'Proyectos',
                contacto: 'Contacto',
                contactoIntro: 'Si quieres hacer una consulta, proponer una colaboracion o hablar sobre un proyecto, dejame tus datos y te respondere a la brevedad.',
                nombre: 'Nombre',
                email: 'Email',
                mensaje: 'Mensaje',
                enviar: 'Enviar',
                footer: '© 2026 · Portafolio profesional'
            },
            proyectos: {
                anterior: 'Proyecto anterior',
                siguiente: 'Proyecto siguiente',
                ver: 'Ver',
                github: 'en GitHub'
            },
            formulario: {
                enviando: 'Enviando mensaje...',
                exito: 'Mensaje enviado correctamente. Te respondere pronto.',
                error: 'No se pudo enviar el mensaje. Intentalo nuevamente en unos minutos.'
            }
        },
        en: {
            nav: {
                sobreMi: 'About me',
                tecnologias: 'Technologies',
                aficiones: 'Hobbies',
                proyectos: 'Projects',
                contacto: 'Contact',
                abrirMenu: 'Open menu',
                cerrarMenu: 'Close menu'
            },
            tema: {
                activarClaro: 'Enable light mode',
                activarOscuro: 'Enable dark mode'
            },
            idioma: {
                boton: 'Change language',
                codigo: 'EN'
            },
            secciones: {
                sobreMiTitulo: 'About me',
                sobreMiP1: 'I have worked on management systems for purchases, sales, and operations in tire shops and workshops. I am a full stack web developer focused on front-end.',
                sobreMiP2: 'I am motivated by combining creativity, logic, and technology to solve problems.',
                sobreMiP3: 'In my free time I enjoy video games, and recently I have started exploring game development.',
                tecnologias: 'Technologies',
                aficiones: 'Hobbies',
                aficion1: 'Interface design',
                aficion2: 'Problem solving',
                aficion3: 'Process automation',
                aficion4: 'Video games',
                proyectos: 'Projects',
                contacto: 'Contact',
                contactoIntro: 'If you want to ask something, propose a collaboration, or talk about a project, leave your details and I will reply shortly.',
                nombre: 'Name',
                email: 'Email',
                mensaje: 'Message',
                enviar: 'Send',
                footer: '© 2026 · Professional portfolio'
            },
            proyectos: {
                anterior: 'Previous project',
                siguiente: 'Next project',
                ver: 'View',
                github: 'on GitHub'
            },
            formulario: {
                enviando: 'Sending message...',
                exito: 'Message sent successfully. I will get back to you soon.',
                error: 'Could not send the message. Please try again in a few minutes.'
            }
        }
    };

    function actualizarEstadoBotonTema() {
        const enModoOscuro = document.body.classList.contains('dark-mode');
        const t = textos[idiomaActual];
        botonesTema.forEach((botonTema) => {
            botonTema.setAttribute('aria-pressed', String(enModoOscuro));
            botonTema.setAttribute('aria-label', enModoOscuro ? t.tema.activarClaro : t.tema.activarOscuro);
        });
    }

    function actualizarEstadoBotonMenu(estaAbierto) {
        if (!btnMenu) {
            return;
        }

        const t = textos[idiomaActual];
        btnMenu.setAttribute('aria-label', estaAbierto ? t.nav.cerrarMenu : t.nav.abrirMenu);
    }

    function cerrarSelectoresIdioma() {
        selectoresIdioma.forEach((selector) => {
            selector.classList.remove('lang-select--open');
        });

        botonesIdioma.forEach((botonIdioma) => {
            botonIdioma.setAttribute('aria-expanded', 'false');
        });
    }

    function actualizarEstadoSelectorIdioma() {
        opcionesIdioma.forEach((opcion) => {
            const activa = opcion.dataset.langOption === idiomaActual;
            opcion.classList.toggle('is-active', activa);
            opcion.setAttribute('aria-selected', String(activa));
        });
    }

    function textoMultilenguaje(valor) {
        if (typeof valor === 'string') {
            return valor;
        }

        if (!valor || typeof valor !== 'object') {
            return '';
        }

        return valor[idiomaActual] || valor.es || '';
    }

    if (botonesTema.length > 0) {
        actualizarEstadoBotonTema();
        botonesTema.forEach((botonTema) => {
            botonTema.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                actualizarEstadoBotonTema();
            });
        });
    }

    function aplicarIdioma() {
        const t = textos[idiomaActual];

        document.documentElement.lang = idiomaActual;

        const enlacesNav = {
            sobreMi: document.querySelector('.navbar__links a[href="#sobre-mi"]'),
            tecnologias: document.querySelector('.navbar__links a[href="#tecnologias"]'),
            aficiones: document.querySelector('.navbar__links a[href="#aficiones"]'),
            proyectos: document.querySelector('.navbar__links a[href="#proyectos"]'),
            contacto: document.querySelector('.navbar__links a[href="#contacto"]')
        };

        if (enlacesNav.sobreMi) enlacesNav.sobreMi.textContent = t.nav.sobreMi;
        if (enlacesNav.tecnologias) enlacesNav.tecnologias.textContent = t.nav.tecnologias;
        if (enlacesNav.aficiones) enlacesNav.aficiones.textContent = t.nav.aficiones;
        if (enlacesNav.proyectos) enlacesNav.proyectos.textContent = t.nav.proyectos;
        if (enlacesNav.contacto) enlacesNav.contacto.textContent = t.nav.contacto;

        const tituloSobreMi = document.querySelector('#sobre-mi h2');
        const parrafosSobreMi = document.querySelectorAll('#sobre-mi p');
        const tituloTecnologias = document.querySelector('#tecnologias h2');
        const tituloAficiones = document.querySelector('#aficiones h2');
        const itemsAficiones = document.querySelectorAll('#aficiones .aficiones__lista li');
        const tituloProyectos = document.querySelector('#proyectos > h2');
        const tituloContacto = document.querySelector('#contacto h2');
        const introContacto = document.querySelector('.contacto__intro');
        const labelNombre = document.querySelector('label[for="nombre"]');
        const labelEmail = document.querySelector('label[for="email"]');
        const labelMensaje = document.querySelector('label[for="mensaje"]');
        const botonEnviar = document.querySelector('.contacto__formulario button[type="submit"]');
        const footer = document.querySelector('.footer p');

        if (tituloSobreMi) tituloSobreMi.textContent = t.secciones.sobreMiTitulo;
        if (parrafosSobreMi[0]) parrafosSobreMi[0].textContent = t.secciones.sobreMiP1;
        if (parrafosSobreMi[1]) parrafosSobreMi[1].textContent = t.secciones.sobreMiP2;
        if (parrafosSobreMi[2]) parrafosSobreMi[2].textContent = t.secciones.sobreMiP3;
        if (tituloTecnologias) tituloTecnologias.textContent = t.secciones.tecnologias;
        if (tituloAficiones) tituloAficiones.textContent = t.secciones.aficiones;
        if (itemsAficiones[0]) itemsAficiones[0].textContent = t.secciones.aficion1;
        if (itemsAficiones[1]) itemsAficiones[1].textContent = t.secciones.aficion2;
        if (itemsAficiones[2]) itemsAficiones[2].textContent = t.secciones.aficion3;
        if (itemsAficiones[3]) itemsAficiones[3].textContent = t.secciones.aficion4;
        if (tituloProyectos) tituloProyectos.textContent = t.secciones.proyectos;
        if (tituloContacto) tituloContacto.textContent = t.secciones.contacto;
        if (introContacto) introContacto.textContent = t.secciones.contactoIntro;
        if (labelNombre) labelNombre.textContent = t.secciones.nombre;
        if (labelEmail) labelEmail.textContent = t.secciones.email;
        if (labelMensaje) labelMensaje.textContent = t.secciones.mensaje;
        if (botonEnviar) botonEnviar.textContent = t.secciones.enviar;
        if (footer) footer.textContent = t.secciones.footer;

        if (btnPrev) {
            btnPrev.setAttribute('aria-label', t.proyectos.anterior);
        }

        if (btnNext) {
            btnNext.setAttribute('aria-label', t.proyectos.siguiente);
        }

        botonesIdioma.forEach((botonIdioma) => {
            botonIdioma.setAttribute('aria-label', t.idioma.boton);
            const codigo = botonIdioma.querySelector('[data-lang-code]');
            if (codigo) {
                codigo.textContent = t.idioma.codigo;
            }
        });

        actualizarEstadoSelectorIdioma();

        actualizarEstadoBotonTema();
        actualizarEstadoBotonMenu(navbar ? navbar.classList.contains('navbar--open') : false);

        if (proyectos.length > 0) {
            mostrarProyecto(indexActual, true);
        }
    }

    if (botonesIdioma.length > 0) {
        botonesIdioma.forEach((botonIdioma) => {
            botonIdioma.addEventListener('click', function(evento) {
                evento.stopPropagation();

                const selector = botonIdioma.closest('[data-lang-select]');
                if (!selector) {
                    return;
                }

                const abrir = !selector.classList.contains('lang-select--open');
                cerrarSelectoresIdioma();

                if (abrir) {
                    selector.classList.add('lang-select--open');
                    botonIdioma.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    if (opcionesIdioma.length > 0) {
        opcionesIdioma.forEach((opcion) => {
            opcion.addEventListener('click', function(evento) {
                evento.stopPropagation();

                const nuevoIdioma = opcion.dataset.langOption;
                if (nuevoIdioma !== 'es' && nuevoIdioma !== 'en') {
                    return;
                }

                idiomaActual = nuevoIdioma;
                localStorage.setItem('portfolio-lang', idiomaActual);
                aplicarIdioma();
                cerrarSelectoresIdioma();
            });
        });
    }

    document.addEventListener('click', cerrarSelectoresIdioma);

    document.addEventListener('keydown', function(evento) {
        if (evento.key === 'Escape') {
            cerrarSelectoresIdioma();
        }
    });

    function cerrarMenuNavegacion() {
        if (!navbar || !btnMenu) {
            return;
        }

        navbar.classList.remove('navbar--open');
        btnMenu.setAttribute('aria-expanded', 'false');
        actualizarEstadoBotonMenu(false);
        cerrarSelectoresIdioma();
    }

    if (btnMenu && navbar && navbarLinks) {
        btnMenu.addEventListener('click', function() {
            const abierto = navbar.classList.toggle('navbar--open');
            btnMenu.setAttribute('aria-expanded', String(abierto));
            actualizarEstadoBotonMenu(abierto);
        });

        navbarLinks.querySelectorAll('a').forEach((enlace) => {
            enlace.addEventListener('click', cerrarMenuNavegacion);
        });
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            cerrarMenuNavegacion();
        }
    });

    // Navegación de proyectos
    const btnPrev = document.querySelector('.proyectos__btn--prev');
    const btnNext = document.querySelector('.proyectos__btn--next');
    const proyectosPrincipal = document.querySelector('.proyectos__principal');
    const proyectosIndicadores = document.querySelector('.proyectos__indicadores');
    const proyectos = [
        {
            titulo: {
                es: 'Demo Taurus',
                en: 'Taurus Demo'
            },
            descripcion: {
                es: 'Desarrollo de una plataforma enfocada en la optimizacion de compras, ventas y operaciones para servitecas y talleres, centralizando la informacion y ofreciendo monitoreo en tiempo real.',
                en: 'Development of a platform focused on optimizing purchases, sales, and operations for tire shops and workshops, centralizing information and providing real-time monitoring.'
            },
            mediaSrc: 'assets/DEMO TAURUS.mp4',
            mediaAlt: {
                es: 'Video demo de Taurus',
                en: 'Taurus demo video'
            },
            mediaClass: 'proyectos__video--contain',
            previewSrc: 'assets/carruselTaurus.jpeg',
            previewAlt: {
                es: 'Vista previa del proyecto Taurus',
                en: 'Taurus project preview'
            },
            etiqueta: {
                es: 'Sistema',
                en: 'System'
            }
        },
        {
            titulo: {
                es: 'Chat en tiempo real',
                en: 'Real-time chat'
            },
            descripcion: {
                es: 'Demo de chat en tiempo real con dos clientes conectados simultaneamente.',
                en: 'Real-time chat demo with two clients connected simultaneously.'
            },
            mediaSrc: 'assets/ChatRealTime.mp4',
            mediaAlt: {
                es: 'Video demo de chat en tiempo real',
                en: 'Real-time chat demo video'
            },
            previewSrc: 'assets/carruselChat.jpeg',
            previewAlt: {
                es: 'Vista previa del chat en tiempo real',
                en: 'Real-time chat preview'
            },
            etiqueta: {
                es: 'Proyecto personal',
                en: 'Side project'
            },
            githubUrl: 'https://github.com/Alemella/chatTiempoReal'
        }
    ];
    let indexActual = 0;
    let enTransicionProyecto = false;
    const duracionTransicionProyecto = 280;
    const reducirAnimaciones = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function actualizarEstadoBotonesProyecto(deshabilitado) {
        if (btnPrev) {
            btnPrev.disabled = deshabilitado;
        }

        if (btnNext) {
            btnNext.disabled = deshabilitado;
        }
    }

    function construirMarkupProyecto(proyectoActual) {
        return `
            <div class="proyectos__principal-media">
                <video class="proyectos__video ${proyectoActual.mediaClass || ''}" autoplay muted loop playsinline>
                    <source src="${proyectoActual.mediaSrc}" type="video/mp4">
                    Tu navegador no soporta el elemento de video.
                </video>
            </div>
            <div class="proyectos__principal-body">
                <div class="proyectos__principal-meta">
                    <div class="proyectos__titulo-grupo">
                        <h3>${textoMultilenguaje(proyectoActual.titulo)}</h3>
                        ${proyectoActual.githubUrl ? `
                            <a class="proyectos__github-link" href="${proyectoActual.githubUrl}" target="_blank" rel="noopener noreferrer" aria-label="${textos[idiomaActual].proyectos.ver} ${textoMultilenguaje(proyectoActual.titulo)} ${textos[idiomaActual].proyectos.github}">
                                <img src="assets/Github.png" alt="GitHub">
                            </a>
                        ` : ''}
                    </div>
                    <span class="proyectos__etiqueta">${textoMultilenguaje(proyectoActual.etiqueta)}</span>
                </div>
                <p class="proyectos__descripcion-breve">${textoMultilenguaje(proyectoActual.descripcion)}</p>
            </div>
        `;
    }

    function mostrarProyecto(indice, forzar = false) {
        if (!proyectosPrincipal) {
            return;
        }

        if (!forzar && enTransicionProyecto) {
            return;
        }

        const indiceNormalizado = (indice + proyectos.length) % proyectos.length;

        if (!forzar && indiceNormalizado === indexActual) {
            return;
        }

        const proyectoActual = proyectos[indiceNormalizado];
        const esTaurus = proyectoActual.mediaClass === 'proyectos__video--contain';

        const renderizarProyecto = function() {
            proyectosPrincipal.classList.toggle('proyectos__principal--contain', esTaurus);

            proyectosPrincipal.innerHTML = construirMarkupProyecto(proyectoActual);

            if (proyectosIndicadores) {
                proyectosIndicadores.innerHTML = proyectos
                    .map((proyecto, indiceProyecto) => `
                        <button class="proyectos__indicador ${indiceProyecto === indiceNormalizado ? 'activo' : ''}" type="button" aria-label="${textos[idiomaActual].proyectos.ver} ${textoMultilenguaje(proyecto.titulo)}" data-indice="${indiceProyecto}">
                            <img class="proyectos__indicador-img" src="${proyecto.previewSrc}" alt="${textoMultilenguaje(proyecto.previewAlt)}">
                            <span>${textoMultilenguaje(proyecto.titulo)}</span>
                        </button>
                    `)
                    .join('');

                proyectosIndicadores.querySelectorAll('.proyectos__indicador').forEach((boton) => {
                    boton.addEventListener('click', function() {
                        const indiceSeleccionado = Number(this.dataset.indice);
                        if (!Number.isNaN(indiceSeleccionado)) {
                            mostrarProyecto(indiceSeleccionado);
                        }
                    });
                });
            }
        };

        indexActual = indiceNormalizado;

        if (forzar || reducirAnimaciones || !proyectosPrincipal.innerHTML.trim()) {
            renderizarProyecto();
            proyectosPrincipal.classList.remove('proyectos__principal--saliendo', 'proyectos__principal--entrando');
            proyectosPrincipal.classList.add('proyectos__principal--activo');
            return;
        }

        enTransicionProyecto = true;
        actualizarEstadoBotonesProyecto(true);
        proyectosPrincipal.classList.remove('proyectos__principal--activo', 'proyectos__principal--entrando');
        proyectosPrincipal.classList.add('proyectos__principal--saliendo');

        window.setTimeout(function() {
            renderizarProyecto();
            proyectosPrincipal.classList.remove('proyectos__principal--saliendo', 'proyectos__principal--activo');
            proyectosPrincipal.classList.add('proyectos__principal--entrando');

            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    proyectosPrincipal.classList.remove('proyectos__principal--entrando');
                    proyectosPrincipal.classList.add('proyectos__principal--activo');
                    enTransicionProyecto = false;
                    actualizarEstadoBotonesProyecto(false);
                });
            });
        }, duracionTransicionProyecto);
    }

    if (btnPrev && proyectos.length > 1) {
        btnPrev.addEventListener('click', function() {
            mostrarProyecto(indexActual - 1);
        });
    }

    if (btnNext && proyectos.length > 1) {
        btnNext.addEventListener('click', function() {
            mostrarProyecto(indexActual + 1);
        });
    }

    // Inicializar mostrando el primer proyecto
    if (proyectos.length > 0) {
        mostrarProyecto(0, true);
    }

    aplicarIdioma();

    // Envio de formulario de contacto
    const formulariosContacto = document.querySelectorAll('.contacto__formulario[data-contact-form]');

    formulariosContacto.forEach((formulario) => {
        const textareaMensaje = formulario.querySelector('textarea[name="mensaje"]');

        function ajustarAlturaTextarea() {
            if (!textareaMensaje) {
                return;
            }

            textareaMensaje.style.height = 'auto';
            textareaMensaje.style.height = `${textareaMensaje.scrollHeight}px`;
        }

        if (textareaMensaje) {
            ajustarAlturaTextarea();
            textareaMensaje.addEventListener('input', ajustarAlturaTextarea);
        }

        formulario.addEventListener('submit', async function(evento) {
            evento.preventDefault();

            const estado = formulario.querySelector('.contacto__estado');
            const botonEnviar = formulario.querySelector('button[type="submit"]');
            const endpointAjax = 'https://formsubmit.co/ajax/alejandros.mella5@gmail.com';

            if (estado) {
                estado.textContent = textos[idiomaActual].formulario.enviando;
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

                ajustarAlturaTextarea();

                if (estado) {
                    estado.textContent = textos[idiomaActual].formulario.exito;
                    estado.className = 'contacto__estado contacto__estado--ok';
                }
            } catch (error) {
                if (estado) {
                    estado.textContent = textos[idiomaActual].formulario.error;
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