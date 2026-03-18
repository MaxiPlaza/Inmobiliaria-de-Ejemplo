import { Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <h3 className="font-heading font-bold text-2xl mb-4">Inmobiliaria Loos</h3>
            <p className="text-primary-100 mb-6 max-w-sm">
              Tu socio de confianza en Olavarría. Más de 20 años de experiencia uniendo familias con sus hogares ideales.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-primary-800 p-2 rounded-full hover:bg-accent-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-primary-800 p-2 rounded-full hover:bg-accent-500 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 border-b border-primary-700 pb-2 inline-block">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="text-accent-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium">Ventas:</p>
                  <a href="tel:2284515054" className="text-primary-100 hover:text-white transition-colors">2284-515054</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-accent-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium">Alquileres:</p>
                  <a href="tel:2284468117" className="text-primary-100 hover:text-white transition-colors">2284-468117</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-accent-500 mt-1 flex-shrink-0" size={20} />
                <p className="text-primary-100">
                  Olavarría, Buenos Aires<br/>Argentina
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 border-b border-primary-700 pb-2 inline-block">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/ventas" className="text-primary-100 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-500 rounded-full"></span> Propiedades en Venta
                </Link>
              </li>
              <li>
                <Link to="/alquileres" className="text-primary-100 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-500 rounded-full"></span> Alquileres
                </Link>
              </li>
              <li>
                <Link to="/lotes" className="text-primary-100 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-500 rounded-full"></span> Lotes y Terrenos
                </Link>
              </li>
              <li>
                <Link to="/requisitos" className="text-primary-100 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-500 rounded-full"></span> Requisitos para Alquilar
                </Link>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-primary-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-primary-100">
          <p>&copy; {new Date().getFullYear()} Inmobiliaria Loos. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link to="/admin/login" className="hover:text-white transition-colors">
              Acceso Administrador
            </Link>
            <span className="hidden md:inline">•</span>
            <p>Diseñado con excelencia profesional.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
