import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, Home, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Optimistic update
      setProperties(properties.map(p => p.id === id ? { ...p, status: newStatus } : p));
      
      const { error } = await supabase
        .from('properties')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        throw error;
      }
    } catch (err) {
      alert('Error al actualizar el estado: ' + err.message);
      fetchProperties(); // Revert on error
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta propiedad? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProperties(properties.filter(p => p.id !== id));
    } catch (err) {
      alert('Error al eliminar la propiedad: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="bg-primary-900 shadow-sm border-b border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2 text-white">
              <Home size={24} />
              <span className="font-heading font-bold text-xl">
                Panel Admin
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-primary-100 text-sm hidden sm:block">
                Administrador
              </span>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-primary-100 hover:text-white transition-colors text-sm font-medium bg-primary-800 px-4 py-2 rounded-lg"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-heading">Propiedades</h1>
            <p className="text-muted-foreground mt-1">Gestiona el catálogo de Inmobiliaria Loos</p>
          </div>
          <button 
            onClick={() => navigate('/admin/property/new')}
            className="flex items-center justify-center gap-2 bg-accent-600 hover:bg-accent-500 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-sm active:scale-95"
          >
            <Plus size={20} />
            <span>Nueva Propiedad</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-start gap-3 text-sm mb-6">
            <AlertCircle className="mt-0.5" size={16} />
            <p>Error cargando datos: {error}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted text-left">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Inmueble
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-white">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-muted-foreground">
                      Cargando propiedades...
                    </td>
                  </tr>
                ) : properties.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-muted-foreground">
                      No hay propiedades cargadas todavía.
                    </td>
                  </tr>
                ) : properties.map((property) => (
                  <tr key={property.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-primary-100 rounded-lg flex items-center justify-center overflow-hidden">
                          {property.imageurl ? (
                             <img src={property.imageurl} alt="" className="w-full h-full object-cover" />
                          ) : (
                             <Home size={20} className="text-primary-600" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-foreground">
                            {property.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ID: {property.id} • {property.type === 'house' ? 'Casa' : property.type === 'lot' ? 'Lote' : 'Departamento'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap relative group">
                      <div className="text-sm font-medium text-foreground">
                        {property.price ? `USD ${property.price.toLocaleString()}` : 'Consultar'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select 
                        value={property.status}
                        onChange={(e) => handleStatusChange(property.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1 rounded-full border-none focus:ring-2 focus:ring-primary-500 cursor-pointer outline-none ${
                          property.status === 'available' ? 'bg-green-100 text-green-800' :
                          property.status === 'sold' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        <option value="available">Disponible</option>
                        <option value="reserved">Reservado</option>
                        <option value="sold">Vendido</option>
                        <option value="rented">Alquilado</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => handleDelete(property.id)}
                          className="text-accent-600 hover:text-accent-700 transition-colors p-1" 
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
