import { useState } from 'react';
import './App.css';

function App() {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleSobreMiHover = () => setShowSubmenu(true);
  const handleSobreMiLeave = () => setShowSubmenu(false);

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <div
              onMouseEnter={handleSobreMiHover}
              onMouseLeave={handleSobreMiLeave}
              style={{ position: 'relative' }}
            >
              Sobre mí
              {showSubmenu && (
                <ul className="submenu">
                  <li>
                    <a href="#idiomas">Idiomas</a>
                  </li>
                </ul>
              )}
            </div>
          </li>
          <li><a href="#contacto">Contacto</a></li>
          {/* Agrega más secciones aquí */}
        </ul>
      </nav>
      {/* ...contenido de la página... */}
      <section id="idiomas">
        <h2>Idiomas</h2>
        {/* Tu contenido de idiomas */}
      </section>
      <section id="contacto">
        <h2>Contacto</h2>
        {/* Tu contenido de contacto */}
      </section>
    </div>
  );
}

export default App;