// ...existing code...

function asegurarIconosDevicon() {
    if (document.querySelector('link[data-devicon]')) {
        return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
    link.setAttribute('data-devicon', 'true');
    document.head.appendChild(link);
}

document.addEventListener('DOMContentLoaded', function() {
    asegurarIconosDevicon();

    // Modo oscuro
    const botonesTema = document.querySelectorAll('[data-theme-toggle]');
    const botonesIdioma = document.querySelectorAll('[data-lang-toggle]');
    const navbar = document.querySelector('.navbar');
    const btnMenu = document.getElementById('menu-toggle');
    const navbarLinks = document.getElementById('navbar-links');
    let idiomaActual = localStorage.getItem('portfolio-lang') === 'en' ? 'en' : 'es';

    const textos = {
        es: {
            nav: {
                sobreMi: 'Sobre mi',
                tecnologias: 'Tecnologias',
                aficiones: 'Intereses',
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
                sobreMiP1: 'Me he desempeñado en el desarrollo de sistemas de gestion de compras, ventas y operaciones para servitecas y talleres. Soy desarrollador web full stack, con foco en front-end.',
                sobreMiP2: 'Me motiva combinar creatividad, logica y tecnologia para resolver problemas.',
                sobreMiP3: 'En mi tiempo libre disfruto creando proyectos personales y experimentando con nuevas ideas.',
                gitHubPersonal: 'Ver perfil de GitHub',
                verCV: 'Ver CV',
                tecnologias: 'Tecnologias',
                aficiones: 'Intereses',
                aficion1: 'Diseño de interfaces',
                aficion2: 'Resolucion de problemas',
                aficion3: 'Automatizacion de procesos',
                aficion4: 'Optimización de sistemas',
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
                github: 'en GitHub',
                stackLabel: 'Stack',
                infoTecnicaResumen: 'Detalles técnicos',
                demosLabel: 'Prueba acá'
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
                aficiones: 'Interests',
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
                sobreMiP3: 'In my free time I enjoy creating personal projects and experimenting with new ideas.',
                gitHubPersonal: 'View GitHub Profile',
                verCV: 'View CV',
                tecnologias: 'Technologies',
                aficiones: 'Interests',
                aficion1: 'Interface design',
                aficion2: 'Problem solving',
                aficion3: 'Process automation',
                aficion4: 'Systems optimization',
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
                github: 'on GitHub',
                stackLabel: 'Stack',
                infoTecnicaResumen: 'Technical details',
                demosLabel: 'Try it here'
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

        const btnGitHub = document.querySelector('.btn-github span');
        const btnCV = document.querySelector('.btn-cv span');
        if (btnGitHub) btnGitHub.textContent = t.secciones.gitHubPersonal;
        if (btnCV) btnCV.textContent = t.secciones.verCV;

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

        actualizarEstadoBotonTema();
        actualizarEstadoBotonMenu(navbar ? navbar.classList.contains('navbar--open') : false);

        if (proyectos.length > 0) {
            mostrarProyecto(indexActual, true);
        }
    }

    if (botonesIdioma.length > 0) {
        botonesIdioma.forEach((botonIdioma) => {
            botonIdioma.addEventListener('click', function() {
                idiomaActual = idiomaActual === 'es' ? 'en' : 'es';
                localStorage.setItem('portfolio-lang', idiomaActual);
                aplicarIdioma();
            });
        });
    }

    function cerrarMenuNavegacion() {
        if (!navbar || !btnMenu) {
            return;
        }

        navbar.classList.remove('navbar--open');
        btnMenu.setAttribute('aria-expanded', 'false');
        actualizarEstadoBotonMenu(false);
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
                es: 'Taurus',
                en: 'Taurus'
            },
            descripcion: {
                es: 'Desarrollo de una plataforma enfocada en la optimizacion de compras, ventas y operaciones para servitecas y talleres, centralizando la informacion y ofreciendo monitoreo en tiempo real.',
                en: 'Development of a platform focused on optimizing purchases, sales, and operations for tire shops and workshops, centralizing information and providing real-time monitoring.'
            },
            mediaSrc: 'assets/DEMO TAURUS.mp4',
            mediaAlt: {
                es: 'Video de Taurus',
                en: 'Taurus video'
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
            },
            tecnologias: [
                { icono: 'devicon-vuejs-plain colored', nombre: 'Vue.js' },
                { icono: 'devicon-laravel-plain colored', nombre: 'Laravel' },
                { icono: 'devicon-mysql-plain colored', nombre: 'MySQL' }
            ],
            infoTecnica: {
                es: 'Agregá aquí el detalle técnico de Taurus: arquitectura, lenguajes, base de datos, librerías clave, etc.',
                en: 'Add the technical detail of Taurus here: architecture, languages, database, key libraries, etc.'
            }
        },
        {
            titulo: {
                es: 'ReVu Chat',
                en: 'ReVu Chat'
            },
            descripcion: {
                es: 'Plataforma de mensajería instantánea en tiempo real que permite a dos personas conversar sin interrupciones ni retrasos. El proyecto simula una sala de chat interactiva donde los mensajes se envían y reciben al instante mediante dos pantallas conectadas de forma simultánea.',
                en: 'Instant messaging platform in real-time that allows two people to chat without interruptions or delays. The project simulates an interactive chat room where messages are sent and received instantly through two connected screens simultaneously.'
            },
            mediaType: 'image',
            mediaSrc: 'assets/RealTimeChat.png',
            mediaAlt: {
                es: 'Captura del chat en tiempo real',
                en: 'Real-time chat screenshot'
            },
            mediaClass: 'proyectos__video--contain',
            previewSrc: 'assets/RevuCarrusel.png',
            previewAlt: {
                es: 'Vista previa del chat en tiempo real',
                en: 'Real-time chat preview'
            },
            etiqueta: {
                es: 'Proyecto personal',
                en: 'Side project'
            },
            githubUrl: 'https://github.com/Alemella/chatTiempoReal',
            demos: [
                {
                    icon: 'assets/faviconReactChat.png',
                    label: 'Chat React',
                    url: 'https://chat-tiempo-real-react.vercel.app/'
                },
                {
                    icon: 'assets/faviconVueChat.png',
                    label: 'Chat Vue',
                    url: 'https://chat-tiempo-real-vue.vercel.app/'
                }
            ],
            tecnologias: [
                { icono: 'devicon-react-original colored', nombre: 'React' },
                { icono: 'devicon-vuejs-plain colored', nombre: 'Vue.js' },
                { icono: 'devicon-socketio-original colored', nombre: 'Socket.IO' },
                { icono: 'devicon-nodejs-plain colored', nombre: 'Node.js' }
            ],
            infoTecnica: {
                es: ' proyecto personal diseñado para demostrar la comunicación bidireccional y simultánea en tiempo real entre dos clientes independientes construidos en React y Vue.',
                en: 'Personal project designed to demonstrate bidirectional and simultaneous real-time communication between two independent clients built with React and Vue.'
            }
        },

        {
            titulo: {
                es: 'TaskDay',
                en: 'TaskDay'
            },
            descripcion: {
                es: 'Aplicación móvil para la gestión de tareas, diseñada para ayudar a los usuarios a organizar sus actividades diarias de forma simple e intuitiva. Permite crear, editar, completar y eliminar tareas, además de gestionar la autenticación de usuarios para mantener la información sincronizada y segura.',
                en: 'Mobile task management application designed to help users organize their daily activities in a simple and intuitive way. Allows creating, editing, completing and deleting tasks, as well as managing user authentication to keep information synchronized and secure.'
            },
            mediaSrc: 'assets/TaskDayx2.mp4',
            mediaAlt: {
                es: 'Video TaskDay',
                en: 'TaskDay video'
            },
            mediaClass: 'proyectos__video--contain',
            previewSrc: 'assets/carruselTaskday.jpeg',
            previewAlt: {
                es: 'Vista previa de TaskDay',
                en: 'TaskDay preview'
            },
            etiqueta: {
                es: 'Proyecto personal',
                en: 'Side project'
            },
            githubUrl: 'https://github.com/Alemella/taskflow-app',
            demosTitulo: {
                es: 'Descarga acá',
                en: 'Download here'
            },
            demos: [
                // TODO: reemplazar por el link real de descarga cuando esté disponible (Play Store, Drive, etc.)
                {
                    icon: 'assets/android_apk.png',
                    label: 'APK Android',
                    url: 'assets/TaskDay.apk',
                    descarga: true
                }
            ],
            tecnologias: [
                { icono: 'devicon-kotlin-plain colored', nombre: 'Kotlin' },
                { icono: 'devicon-spring-plain colored', nombre: 'Spring Boot' },
                { icono: 'devicon-postgresql-plain colored', nombre: 'PostgreSQL' },
            ],
            infoTecnica: {
                es: 'TaskDay fue desarrollado como un proyecto Full Stack, utilizando Kotlin para la aplicación Android y Spring Boot para el backend. La comunicación entre ambos se realiza mediante una API REST, con autenticación basada en JWT para proteger el acceso de los usuarios. La persistencia de datos se gestiona con PostgreSQL, mientras que Retrofit se encarga de las solicitudes HTTP desde la aplicación móvil. El proyecto sigue una arquitectura cliente-servidor y aplica operaciones CRUD para la gestión de usuarios y tareas.',
                en: 'TaskDay was built as a full stack project, using Kotlin for the Android app and Spring Boot for the backend. Communication between them happens through a REST API, with JWT-based authentication to protect user access. Data persistence is managed with PostgreSQL, while Retrofit handles HTTP requests from the mobile app. The project follows a client-server architecture and applies CRUD operations for user and task management.'
            }
        }
    ];
    let indexActual = 0;
    let enTransicionProyecto = false;
    const duracionTransicionProyecto = 320;
    const reducirAnimaciones = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function obtenerDireccionProyecto(indiceOrigen, indiceDestino) {
        if (indiceOrigen === indiceDestino || proyectos.length < 2) {
            return 'right';
        }

        const avance = (indiceDestino - indiceOrigen + proyectos.length) % proyectos.length;
        const retroceso = (indiceOrigen - indiceDestino + proyectos.length) % proyectos.length;

        return avance <= retroceso ? 'right' : 'left';
    }

    function actualizarEstadoBotonesProyecto(deshabilitado) {
        if (btnPrev) {
            btnPrev.disabled = deshabilitado;
        }

        if (btnNext) {
            btnNext.disabled = deshabilitado;
        }
    }

    function construirMarkupProyecto(proyectoActual) {
        const mediaMarkup = proyectoActual.mediaType === 'image'
            ? `
                <img class="proyectos__video ${proyectoActual.mediaClass || ''}" src="${proyectoActual.mediaSrc}" alt="${textoMultilenguaje(proyectoActual.mediaAlt)}">
            `
            : `
                <video class="proyectos__video ${proyectoActual.mediaClass || ''}" controls autoplay muted loop playsinline>
                    <source src="${proyectoActual.mediaSrc}" type="video/mp4">
                    Tu navegador no soporta el elemento de video.
                </video>
            `;

        return `
            <div class="proyectos__principal-media">
                ${mediaMarkup}
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
                ${(proyectoActual.tecnologias && proyectoActual.tecnologias.length > 0) || proyectoActual.demos ? `
                    <div class="proyectos__meta-row">
                        ${proyectoActual.tecnologias && proyectoActual.tecnologias.length > 0 ? `
                            <div class="proyectos__stack">
                                <span class="proyectos__stack-label">${textos[idiomaActual].proyectos.stackLabel}</span>
                                <div class="proyectos__stack-lista">
                                    ${proyectoActual.tecnologias.map(tech => `
                                        <span class="proyectos__stack-chip">
                                            ${tech.icono ? `<i class="${tech.icono}" aria-hidden="true"></i>` : ''}
                                            <span>${tech.nombre}</span>
                                        </span>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        ${proyectoActual.demos ? `
                            <div class="proyectos__demos">
                                <span class="proyectos__demos-label">${proyectoActual.demosTitulo ? textoMultilenguaje(proyectoActual.demosTitulo) : textos[idiomaActual].proyectos.demosLabel}</span>
                                <div class="proyectos__demos-links">
                                    ${proyectoActual.demos.map(demo => `
                                        <a href="${demo.url}" ${demo.descarga ? `download` : `target="_blank" rel="noopener noreferrer"`} class="proyectos__demo-link">
                                            <img src="${demo.icon}" alt="">
                                            <span>${demo.label}</span>
                                        </a>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}
                ${proyectoActual.infoTecnica ? `
                    <details class="proyectos__info-tecnica">
                        <summary class="proyectos__info-tecnica-resumen">
                            <span class="proyectos__info-tecnica-icono" aria-hidden="true">&lt;/&gt;</span>
                            ${textos[idiomaActual].proyectos.infoTecnicaResumen}
                        </summary>
                        <p class="proyectos__info-tecnica-contenido">${textoMultilenguaje(proyectoActual.infoTecnica)}</p>
                    </details>
                ` : ''}
            </div>
        `;
    }

    function mostrarProyecto(indice, forzar = false, direccion = 'right') {
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
        const esContain = proyectoActual.mediaClass === 'proyectos__video--contain';

        const renderizarProyecto = function() {
            proyectosPrincipal.classList.toggle('proyectos__principal--contain', esContain);
            proyectosPrincipal.dataset.direccion = direccion;

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
                            mostrarProyecto(indiceSeleccionado, false, obtenerDireccionProyecto(indexActual, indiceSeleccionado));
                        }
                    });
                });
            }
        };

        indexActual = indiceNormalizado;

        if (forzar || reducirAnimaciones || !proyectosPrincipal.innerHTML.trim()) {
            renderizarProyecto();
            proyectosPrincipal.classList.remove(
                'proyectos__principal--saliendo',
                'proyectos__principal--entrando',
                'proyectos__principal--salida-izquierda',
                'proyectos__principal--salida-derecha',
                'proyectos__principal--entrada-izquierda',
                'proyectos__principal--entrada-derecha'
            );
            proyectosPrincipal.classList.add('proyectos__principal--activo');
            return;
        }

        enTransicionProyecto = true;
        actualizarEstadoBotonesProyecto(true);
        const claseSalida = direccion === 'left'
            ? 'proyectos__principal--salida-derecha'
            : 'proyectos__principal--salida-izquierda';
        const claseEntrada = direccion === 'left'
            ? 'proyectos__principal--entrada-izquierda'
            : 'proyectos__principal--entrada-derecha';

        proyectosPrincipal.classList.remove(
            'proyectos__principal--activo',
            'proyectos__principal--entrando',
            'proyectos__principal--saliendo',
            'proyectos__principal--salida-izquierda',
            'proyectos__principal--salida-derecha',
            'proyectos__principal--entrada-izquierda',
            'proyectos__principal--entrada-derecha'
        );
        proyectosPrincipal.classList.add(claseSalida);

        window.setTimeout(function() {
            renderizarProyecto();
            proyectosPrincipal.classList.remove(
                'proyectos__principal--saliendo',
                'proyectos__principal--activo',
                'proyectos__principal--salida-izquierda',
                'proyectos__principal--salida-derecha'
            );
            proyectosPrincipal.classList.add(claseEntrada);

            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    proyectosPrincipal.classList.remove(claseEntrada);
                    proyectosPrincipal.classList.add('proyectos__principal--activo');
                    enTransicionProyecto = false;
                    actualizarEstadoBotonesProyecto(false);
                });
            });
        }, duracionTransicionProyecto);
    }

    if (btnPrev && proyectos.length > 1) {
        btnPrev.addEventListener('click', function() {
            mostrarProyecto(indexActual - 1, false, 'left');
        });
    }

    if (btnNext && proyectos.length > 1) {
        btnNext.addEventListener('click', function() {
            mostrarProyecto(indexActual + 1, false, 'right');
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