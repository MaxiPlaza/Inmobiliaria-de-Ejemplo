import { Bed, Bath, Maximize, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PropertyCard({ property }) {
  const { id, title, type, operation, price, location, m2, bedrooms, bathrooms, imageurl, status } = property;

  return (
    <Link to={`/propiedad/${id}`} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-border group cursor-pointer block">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageurl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1473'} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {operation === 'sale' ? (
            <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
              Venta
            </span>
          ) : (
            <span className="bg-accent-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
              Alquiler
            </span>
          )}
        </div>
        
        {status !== 'available' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
             <span className="bg-accent-600 outline outline-4 outline-white text-white text-lg font-bold px-6 py-2 uppercase transform -rotate-12 shadow-xl tracking-widest">
              {status === 'sold' ? 'Vendido' : 'Reservado'}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
          <MapPin size={16} />
          <span>{location}</span>
        </div>
        
        <h3 className="font-heading font-bold text-xl text-foreground mb-1 line-clamp-1">
          {title}
        </h3>
        
        <p className="text-2xl font-bold text-primary-700 mb-4">
          USD {price.toLocaleString()}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border text-muted-foreground text-sm">
          <div className="flex items-center gap-1.5" title="Metros cuadrados">
            <Maximize size={18} className="text-primary-500" />
            <span className="font-medium">{m2} m²</span>
          </div>
          <div className="flex items-center gap-1.5" title="Habitaciones">
            <Bed size={18} className="text-primary-500" />
            <span className="font-medium">{bedrooms}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Baños">
            <Bath size={18} className="text-primary-500" />
            <span className="font-medium">{bathrooms}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
