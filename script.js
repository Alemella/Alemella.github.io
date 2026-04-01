// ...existing code...

document.addEventListener('DOMContentLoaded', function() {
    // Modo oscuro
    const btnDark = document.getElementById('toggle-dark');

    function actualizarEstiloBotonTema() {
        const enModoOscuro = document.body.classList.contains('dark-mode');
        btnDark.textContent = enModoOscuro ? '☀️' : '🌙';
    }

    if (btnDark) {
        actualizarEstiloBotonTema();
        btnDark.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            actualizarEstiloBotonTema();
        });
    }
});

// ...existing code...