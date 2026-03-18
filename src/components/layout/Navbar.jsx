import { Link } from 'react-router-dom';
import { Menu, X, Home } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Ventas', path: '/ventas' },
    { name: 'Alquileres', path: '/alquileres' },
    { name: 'Lotes', path: '/lotes' },
    { name: 'Requisitos', path: '/requisitos' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-primary-900 text-white p-2 rounded-lg">
                <Home size={28} />
              </div>
              <span className="font-heading font-bold text-2xl text-primary-900">
                Inmobiliaria Loos
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-foreground hover:text-accent-500 font-medium transition-colors"
               >
                {link.name}
              </Link>
            ))}
            <Link
              to="/tasaciones"
              className="bg-accent-600 hover:bg-accent-500 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              Tasaciones
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary-900 focus:outline-none p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary-900 hover:bg-muted"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/tasaciones"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 mt-4 text-center rounded-md text-base font-bold bg-accent-600 text-white hover:bg-accent-500"
            >
              Tasaciones
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
