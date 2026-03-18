import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Save, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function PropertyForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    operation: 'sale',
    type: 'house',
    price: '',
    location: '',
    m2: '',
    bedrooms: '',
    bathrooms: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = null;

      // 1. Upload image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('property-images')
          .upload(filePath, imageFile);

        if (uploadError) throw new Error('Error subiendo la imagen: ' + uploadError.message);

        const { data: { publicUrl } } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrl;
      }

      // 2. Insert into database
      const { error: dbError } = await supabase
        .from('properties')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            operation: formData.operation,
            type: formData.type,
            price: Number(formData.price),
            location: formData.location,
            m2: formData.m2 ? Number(formData.m2) : null,
            bedrooms: formData.bedrooms ? Number(formData.bedrooms) : null,
            bathrooms: formData.bathrooms ? Number(formData.bathrooms) : null,
            status: 'available',
            imageurl: imageUrl
          }
        ]);

      if (dbError) throw new Error('Error al guardar en base de datos: ' + dbError.message);

      navigate('/admin/dashboard');

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 pb-12">
      <nav className="bg-primary-900 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2 text-primary-100 hover:text-white transition-colors text-sm font-medium"
            >
              <ArrowLeft size={20} />
              Volver al Dashboard
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground font-heading mb-8">
          Cargar Nueva Propiedad
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-border">
          
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-start gap-3 text-sm">
              <AlertCircle className="mt-0.5" size={16} />
              <p>{error}</p>
            </div>
          )}

          {/* Images */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Imagen Principal</label>
            {imagePreview ? (
               <div className="relative rounded-lg overflow-hidden border border-border h-64 bg-muted">
                 <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                 <button 
                   type="button" 
                   onClick={() => {setImageFile(null); setImagePreview('');}}
                   className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 text-sm rounded-md hover:bg-black/80"
                 >
                   Cambiar
                 </button>
               </div>
            ) : (
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-lg hover:border-primary-500 transition-colors cursor-pointer bg-muted/30 hover:bg-muted/50">
                  <div className="space-y-2 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="flex text-sm text-muted-foreground justify-center">
                      <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 px-2 py-1">
                        <span>Seleccionar Foto</span>
                        <input name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground">PNG o JPG</p>
                  </div>
                </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-foreground mb-1">Título</label>
              <input 
                type="text" 
                name="title"
                required
                value={formData.title} 
                onChange={handleChange}
                className="w-full px-4 py-3 bg-muted border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all" 
                placeholder="Ej: Hermosa Casa Céntrica" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-1">Operación</label>
              <select name="operation" value={formData.operation} onChange={handleChange} className="w-full px-4 py-3 bg-muted border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all">
                <option value="sale">Venta</option>
                <option value="rent">Alquiler</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-1">Tipo</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-3 bg-muted border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all">
                <option value="house">Casa</option>
                <option value="apartment">Departamento</option>
                <option value="lot">Lote</option>
                <option value="commercial">Comercial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-1">Precio (USD/ARS)</label>
              <input name="price" type="number" required value={formData.price} onChange={handleChange} className="w-full px-4 py-3 bg-muted border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="100000" />
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-1">Ubicación</label>
              <input name="location" type="text" required value={formData.location} onChange={handleChange} className="w-full px-4 py-3 bg-muted border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="Ej: Av. Colón 1234" />
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-1">Metros Cuadrados</label>
              <input name="m2" type="number" value={formData.m2} onChange={handleChange} className="w-full px-4 py-3 bg-muted border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="120" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">Habitaciones</label>
                <input name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} className="w-full px-4 py-3 bg-muted border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="3" />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">Baños</label>
                <input name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} className="w-full px-4 py-3 bg-muted border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="2" />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-foreground mb-1">Descripción</label>
              <textarea 
                name="description"
                rows="4" 
                value={formData.description} 
                onChange={handleChange}
                className="w-full px-4 py-3 bg-muted border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none" 
                placeholder="Detalles sobre el inmueble..."
              ></textarea>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              <Save size={20} />
              {loading ? 'Guardando...' : 'Guardar Propiedad'}
            </button>
          </div>
        </form>

      </main>
    </div>
  );
}
