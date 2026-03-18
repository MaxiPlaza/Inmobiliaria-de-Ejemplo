import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building, DollarSign, Download, CheckCircle2 } from 'lucide-react';
import PropertyCard from '../components/ui/PropertyCard';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import { useProperties } from '../hooks/useProperties';

export default function Home() {
  const [filterOp, setFilterOp] = useState('all');
  const [filterType, setFilterType] = useState('all');
  
  const { properties, loading, error } = useProperties();

  const filteredProperties = properties.filter(p => {
    if (filterOp !== 'all' && p.operation !== filterOp) return false;
    if (filterType !== 'all' && p.type !== filterType) return false;
    return true;
  });

  return (
    <>
      <WhatsAppButton />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2075" 
            alt="Propiedades Olavarría" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-900/60 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6 drop-shadow-md">
            Encontrá tu lugar en el mundo
          </h1>
          <p className="text-xl md:text-2xl text-primary-50 mb-10 max-w-2xl mx-auto drop-shadow-sm">
            Las mejores propiedades y lotes en Olavarría con el respaldo de más de 20 años de experiencia.
          </p>
          
          {/* Main Search/Filter Box */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full text-left">
              <label className="block text-sm font-medium text-foreground mb-1">Operación</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <select 
                  className="w-full pl-10 pr-4 py-3 bg-muted border-transparent rounded-lg focus:border-primary-500 focus:bg-white focus:ring-0 transition-colors cursor-pointer appearance-none"
                  value={filterOp}
                  onChange={(e) => setFilterOp(e.target.value)}
                >
                  <option value="all">Todas las operaciones</option>
                  <option value="sale">Comprar</option>
                  <option value="rent">Alquilar</option>
                </select>
              </div>
            </div>
            
            <div className="flex-1 w-full text-left">
              <label className="block text-sm font-medium text-foreground mb-1">Tipo de Inmueble</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <select 
                  className="w-full pl-10 pr-4 py-3 bg-muted border-transparent rounded-lg focus:border-primary-500 focus:bg-white focus:ring-0 transition-colors cursor-pointer appearance-none"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">Todos los tipos</option>
                  <option value="house">Casas</option>
                  <option value="apartment">Departamentos</option>
                  <option value="lot">Lotes / Terrenos</option>
                </select>
              </div>
            </div>

            <button className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-md flex items-center justify-center gap-2">
              <Search size={20} />
              <span>Buscar</span>
            </button>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-20 bg-background" id="catalog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-4">
              Propiedades Destacadas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explora nuestra selección de propiedades exclusivas en la ciudad de Olavarría y sus alrededores.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-12 text-xl text-muted-foreground animate-pulse">
                Cargando propiedades...
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-12 text-xl text-red-500">
                Error al cargar: {error}
              </div>
            ) : filteredProperties.length > 0 ? (
              filteredProperties.map(prop => (
                <PropertyCard key={prop.id} property={prop} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-muted-foreground">No encontramos propiedades con esos filtros.</p>
                <button 
                  onClick={() => { setFilterOp('all'); setFilterType('all'); }}
                  className="mt-4 text-primary-600 font-medium hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/ventas" className="inline-block border-2 border-primary-600 text-primary-700 hover:bg-primary-50 px-8 py-3 rounded-full font-bold transition-colors">
              Ver todo el catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-primary-900 relative overflow-hidden">
        {/* Abstract shapes bg */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
          <svg width="404" height="404" fill="none" viewBox="0 0 404 404"><defs><pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="4" height="4" fill="currentColor"></rect></pattern></defs><rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" className="text-primary-800"></rect></svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">
                Alquilar nunca fue tan simple
              </h2>
              <p className="text-primary-100 mb-8 text-lg">
                Conocé nuestros requisitos para ingresar. Hemos simplificado el proceso para que puedas tener las llaves de tu nuevo hogar lo antes posible.
              </p>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent-500 mt-1 flex-shrink-0" />
                  <span>Mes de adelanto y mes de depósito.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent-500 mt-1 flex-shrink-0" />
                  <span>Recibos de sueldo que tripliquen el valor del alquiler.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent-500 mt-1 flex-shrink-0" />
                  <span>2 Garantes con recibo de sueldo o 1 garantía propietaria.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent-500 mt-1 flex-shrink-0" />
                  <span>Fotocopias de DNI de locatario y garantes.</span>
                </li>
              </ul>
              
              <button className="bg-accent-600 hover:bg-accent-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center gap-3 active:scale-95 group">
                <Download className="group-hover:-translate-y-1 transition-transform" />
                <span>Descargar Guía en PDF</span>
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-primary-100 transform md:rotate-2">
              <h3 className="text-2xl font-bold text-primary-900 mb-6 border-b pb-4">¿Tenés dudas?</h3>
              <p className="text-muted-foreground mb-6">
                Dejanos tus datos y un asesor se pondrá en contacto a la brevedad para ayudarte con tus requisitos.
              </p>
              <form className="space-y-4">
                <input type="text" placeholder="Nombre completo" className="w-full px-4 py-3 bg-muted border-transparent rounded-lg focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 transition-all outline-none" />
                <input type="tel" placeholder="Teléfono" className="w-full px-4 py-3 bg-muted border-transparent rounded-lg focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 transition-all outline-none" />
                <button type="button" className="w-full bg-primary-900 hover:bg-primary-800 text-white py-3 rounded-lg font-bold transition-colors">
                  Solicitar Asesoramiento
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
