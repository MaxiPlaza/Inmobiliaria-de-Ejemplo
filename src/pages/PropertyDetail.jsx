import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Bed, Bath, Maximize, Building, Share2, Ruler } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProperty() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-24 text-center">
        <div className="inline-block animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mb-4"></div>
        <p className="text-xl text-muted-foreground">Cargando detalles de la propiedad...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen py-24 text-center px-4">
        <h2 className="text-3xl font-bold border-b pb-4 mb-4 text-red-600">Error</h2>
        <p className="text-xl text-muted-foreground mb-8">No se pudo encontrar la propiedad solicitada.</p>
        <Link to="/" className="text-primary-600 font-bold hover:underline inline-flex items-center gap-2">
          <ArrowLeft size={20} /> Volver al inicio
        </Link>
      </div>
    );
  }

  const { title, description, type, operation, price, location, m2, bedrooms, bathrooms, imageurl, status } = property;
  
  const typeText = { house: 'Casa', apartment: 'Departamento', lot: 'Lote', commercial: 'Comercial' }[type];
  const opText = { sale: 'Venta', rent: 'Alquiler' }[operation];
  
  const wpMessage = `Hola Inmobiliaria Loos! Me interesa la propiedad: ${title} (Ref: ${id}). ¿Podrían darme más información?`;
  const wpLink = `https://wa.me/5492284468117?text=${encodeURIComponent(wpMessage)}`;

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      {/* Header / Hero specific to property */}
      <div className="bg-primary-900 pt-8 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to={-1} className="inline-flex items-center gap-2 text-primary-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={20} />
            Volver
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-accent-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {opText}
                </span>
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {typeText}
                </span>
                {status !== 'available' && (
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${status === 'sold' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'}`}>
                    {status === 'sold' ? 'Vendido' : status === 'reserved' ? 'Reservado' : 'Alquilado'}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-heading font-extrabold mb-2 max-w-4xl leading-tight">
                {title}
              </h1>
              <p className="text-primary-100 flex items-center gap-2 text-lg">
                <MapPin size={20} /> {location}
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-primary-200 text-sm font-medium mb-1">Precio</p>
              <p className="text-4xl font-bold text-white">
                {price ? `USD ${price.toLocaleString()}` : 'Consultar'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery (Just 1 for now) */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-border">
              <img 
                src={imageurl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1473'} 
                alt={title}
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>

            {/* Features */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-border">
              <h3 className="text-2xl font-bold font-heading text-primary-900 mb-6 border-b border-border pb-4">Características Principales</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-xl">
                    <Maximize className="text-accent-600 mb-2" size={32} />
                    <span className="text-sm text-muted-foreground font-medium">Superficie</span>
                    <span className="font-bold text-lg text-foreground">{m2 ? `${m2} m²` : '-'}</span>
                </div>
                {type !== 'lot' && (
                  <>
                    <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-xl">
                        <Bed className="text-accent-600 mb-2" size={32} />
                        <span className="text-sm text-muted-foreground font-medium">Dormitorios</span>
                        <span className="font-bold text-lg text-foreground">{bedrooms || '-'}</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-xl">
                        <Bath className="text-accent-600 mb-2" size={32} />
                        <span className="text-sm text-muted-foreground font-medium">Baños</span>
                        <span className="font-bold text-lg text-foreground">{bathrooms || '-'}</span>
                    </div>
                  </>
                )}
                <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-xl">
                    <Building className="text-accent-600 mb-2" size={32} />
                    <span className="text-sm text-muted-foreground font-medium">Tipo</span>
                    <span className="font-bold text-lg text-foreground capitalize">{typeText}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-border">
              <h3 className="text-2xl font-bold font-heading text-primary-900 mb-6 border-b border-border pb-4">Descripción</h3>
              <div className="prose max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
                {description || 'No hay descripción detallada disponible para esta propiedad.'}
              </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-border sticky top-24">
              <h3 className="text-xl font-bold text-primary-900 mb-2">¿Te interesa esta propiedad?</h3>
              <p className="text-muted-foreground mb-6 text-sm">Comunicate directamente con un asesor de ventas indicando la referencia de la propiedad.</p>
              
              <a 
                href={wpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-6 rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-3 mb-4"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png" alt="WhatsApp" className="w-6 h-6" />
                Consultar por WhatsApp
              </a>

              <button className="w-full bg-muted hover:bg-muted/80 text-foreground py-4 px-6 rounded-xl font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 border border-border">
                <Share2 size={20} />
                Compartir Propiedad
              </button>

              <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
                Referencia interna: #{id}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
