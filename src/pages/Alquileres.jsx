import PropertyCard from '../components/ui/PropertyCard';
import { useProperties } from '../hooks/useProperties';

export default function Alquileres() {
  const { properties, loading, error } = useProperties();
  const filtered = properties.filter(p => p.operation === 'rent');

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-primary-900 mb-4">
          Alquileres Disponibles
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Buscá tu próximo hogar o espacio de trabajo. Contamos con una amplia variedad de opciones que se ajustan a tus necesidades.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
           <div className="col-span-full text-center py-12 text-xl text-muted-foreground animate-pulse">Cargando propiedades...</div>
        ) : error ? (
           <div className="col-span-full text-center py-12 text-xl text-red-500">Error: {error}</div>
        ) : filtered.map(prop => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>
      
      {!loading && filtered.length === 0 && (
         <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-border">
            <p className="text-xl text-muted-foreground">Por el momento no hay propiedades en alquiler publicadas.</p>
         </div>
      )}
    </div>
  );
}
