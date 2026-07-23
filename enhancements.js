// ==========================================================================
// Mejoras visuales: hero animado, scroll-reveal, navbar reactiva,
// barra de progreso y spotlight de cursor.
// Este archivo es independiente de script.js para no tocar la lógica
// existente (tema, idioma, carrusel de proyectos, formulario de contacto).
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
    var prefiereReducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ----------------------------------------------------------------
       1) Revelado progresivo al hacer scroll
       ---------------------------------------------------------------- */
    var elementosRevelar = document.querySelectorAll('[data-reveal]');

    if (elementosRevelar.length > 0 && !prefiereReducirMovimiento && 'IntersectionObserver' in window) {
        elementosRevelar.forEach(function (el) {
            el.classList.add('reveal-init');
            var retraso = Number(el.getAttribute('data-reveal-delay') || 0) * 90;
            if (retraso > 0) {
                el.style.transitionDelay = retraso + 'ms';
            }
        });

        var observadorRevelado = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('reveal-visible');
                    observadorRevelado.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

        elementosRevelar.forEach(function (el) {
            observadorRevelado.observe(el);
        });
    }

    /* ----------------------------------------------------------------
       2) Barra de progreso de scroll
       ---------------------------------------------------------------- */
    var barraProgreso = document.querySelector('[data-scroll-progreso]');

    function actualizarBarraProgreso() {
        if (!barraProgreso) return;
        var alturaTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var progreso = alturaTotal > 0 ? (window.scrollY / alturaTotal) * 100 : 0;
        barraProgreso.style.width = progreso + '%';
    }

    /* ----------------------------------------------------------------
       3) Navbar con estado "scrolled"
       ---------------------------------------------------------------- */
    var navbar = document.querySelector('.navbar');

    function actualizarNavbarScroll() {
        if (!navbar) return;
        if (window.scrollY > 12) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
    }

    var scrollTicking = false;
    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            window.requestAnimationFrame(function () {
                actualizarBarraProgreso();
                actualizarNavbarScroll();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    actualizarBarraProgreso();
    actualizarNavbarScroll();

    /* ----------------------------------------------------------------
       4) Spotlight que sigue al cursor (solo en dispositivos con mouse)
       ---------------------------------------------------------------- */
    var brilloCursor = document.querySelector('[data-cursor-glow]');
    var tieneMousePreciso = window.matchMedia('(pointer: fine)').matches;

    if (brilloCursor && tieneMousePreciso && !prefiereReducirMovimiento) {
        var glowTicking = false;
        var ultimoX = 0;
        var ultimoY = 0;

        document.addEventListener('mousemove', function (evento) {
            ultimoX = evento.clientX;
            ultimoY = evento.clientY;

            if (!brilloCursor.classList.contains('cursor-glow--activo')) {
                brilloCursor.classList.add('cursor-glow--activo');
            }

            if (!glowTicking) {
                window.requestAnimationFrame(function () {
                    brilloCursor.style.transform = 'translate(' + ultimoX + 'px, ' + ultimoY + 'px)';
                    glowTicking = false;
                });
                glowTicking = true;
            }
        });

        document.addEventListener('mouseleave', function () {
            brilloCursor.classList.remove('cursor-glow--activo');
        });
    }

    /* ----------------------------------------------------------------
       5) Hero: textos bilingües + efecto de máquina de escribir
       ---------------------------------------------------------------- */
    var elementoPretitulo = document.querySelector('[data-hero-pretitulo]');
    var elementoRotativo = document.querySelector('[data-hero-rotativo]');
    var elementoDescripcion = document.querySelector('[data-hero-descripcion]');
    var elementoBtnProyectos = document.querySelector('[data-hero-btn-proyectos]');
    var elementoBtnCV = document.querySelector('[data-hero-btn-cv]');
    var elementoScrollHero = document.querySelector('[data-hero-scroll]');
    var enlaceNavInicio = document.querySelector('.navbar__links a[href="#inicio"]');

    var textosHero = {
        es: {
            pretitulo: 'Hola, soy',
            roles: [
                'Desarrollador Full Stack',
                'Especialista en Frontend',
                'Creador de interfaces web',
                'Resolviendo problemas con código'
            ],
            descripcion: 'Construyo productos web rápidos, cuidados y fáciles de usar, desde la interfaz hasta la lógica que los conecta.',
            btnProyectos: 'Ver proyectos',
            btnCV: 'Ver CV',
            scrollAria: 'Bajar a la sección Sobre mí',
            navInicio: 'Inicio'
        },
        en: {
            pretitulo: "Hi, I'm",
            roles: [
                'Full Stack Developer',
                'Frontend Specialist',
                'Web Interface Creator',
                'Solving problems with code'
            ],
            descripcion: 'I build fast, polished and easy-to-use web products, from the interface to the logic that connects them.',
            btnProyectos: 'View projects',
            btnCV: 'View CV',
            scrollAria: 'Scroll down to the About me section',
            navInicio: 'Home'
        }
    };

    function obtenerIdiomaActual() {
        return localStorage.getItem('portfolio-lang') === 'en' ? 'en' : 'es';
    }

    var maquinaEscribir = {
        idioma: obtenerIdiomaActual(),
        indiceRol: 0,
        indiceCaracter: 0,
        borrando: false,
        timeoutId: null
    };

    function detenerMaquinaEscribir() {
        if (maquinaEscribir.timeoutId) {
            window.clearTimeout(maquinaEscribir.timeoutId);
            maquinaEscribir.timeoutId = null;
        }
    }

    function pasoMaquinaEscribir() {
        if (!elementoRotativo) return;

        var roles = textosHero[maquinaEscribir.idioma].roles;
        var rolActual = roles[maquinaEscribir.indiceRol % roles.length];
        var espera = 55;

        if (!maquinaEscribir.borrando) {
            maquinaEscribir.indiceCaracter += 1;
            elementoRotativo.textContent = rolActual.slice(0, maquinaEscribir.indiceCaracter);

            if (maquinaEscribir.indiceCaracter >= rolActual.length) {
                maquinaEscribir.borrando = true;
                espera = 1600;
            }
        } else {
            maquinaEscribir.indiceCaracter -= 1;
            elementoRotativo.textContent = rolActual.slice(0, maquinaEscribir.indiceCaracter);
            espera = 28;

            if (maquinaEscribir.indiceCaracter <= 0) {
                maquinaEscribir.borrando = false;
                maquinaEscribir.indiceRol += 1;
                espera = 400;
            }
        }

        maquinaEscribir.timeoutId = window.setTimeout(pasoMaquinaEscribir, espera);
    }

    function iniciarMaquinaEscribir() {
        detenerMaquinaEscribir();
        maquinaEscribir.indiceCaracter = 0;
        maquinaEscribir.borrando = false;

        if (prefiereReducirMovimiento) {
            if (elementoRotativo) {
                elementoRotativo.textContent = textosHero[maquinaEscribir.idioma].roles[0];
            }
            return;
        }

        pasoMaquinaEscribir();
    }

    function aplicarTextosHero() {
        var idioma = obtenerIdiomaActual();
        maquinaEscribir.idioma = idioma;
        maquinaEscribir.indiceRol = 0;
        var t = textosHero[idioma];

        if (elementoPretitulo) elementoPretitulo.textContent = t.pretitulo;
        if (elementoDescripcion) elementoDescripcion.textContent = t.descripcion;
        if (elementoBtnProyectos) elementoBtnProyectos.textContent = t.btnProyectos;
        if (elementoBtnCV) elementoBtnCV.textContent = t.btnCV;
        if (elementoScrollHero) elementoScrollHero.setAttribute('aria-label', t.scrollAria);
        if (enlaceNavInicio) enlaceNavInicio.textContent = t.navInicio;

        iniciarMaquinaEscribir();
    }

    aplicarTextosHero();

    document.querySelectorAll('[data-lang-toggle]').forEach(function (boton) {
        boton.addEventListener('click', function () {
            // El toggle de idioma en script.js ya actualizó localStorage
            // antes de que corra este listener adicional (los listeners
            // se ejecutan en el orden en que fueron registrados).
            window.setTimeout(aplicarTextosHero, 0);
        });
    });
});
