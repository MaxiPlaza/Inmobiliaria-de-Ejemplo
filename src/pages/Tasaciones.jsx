import { Calculator, Send } from 'lucide-react';
import { useState } from 'react';

export default function Tasaciones() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock submit
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-primary-900 mb-4 flex justify-center items-center gap-4">
          <Calculator className="text-accent-600" size={40} />
          Tasaciones Profesionales
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Conocé el valor real de tu propiedad en el mercado actual. Contamos con tasadores expertos y matriculados que te guiarán de forma honesta y precisa.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-border">
        <div className="bg-primary-900 p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Solicitar una Tasación</h2>
          <p className="text-primary-100">Completá el formulario y nos contactaremos a la brevedad.</p>
        </div>
        
        <div className="p-8">
          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">¡Solicitud Enviada!</h3>
              <p className="text-muted-foreground">Uno de nuestros tasadores se comunicará contigo pronto para coordinar una visita.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-6 text-primary-600 font-bold hover:underline"
              >
                Hacer otra solicitud
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Nombre y Apellido *</label>
                  <input type="text" required className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Teléfono *</label>
                  <input type="tel" required className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">Dirección de la Propiedad *</label>
                <input type="text" required placeholder="Ej: San Martín 1234, Olavarría" className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-1">Tipo de Propiedad *</label>
                <select required className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all">
                  <option value="">Selecciona un tipo</option>
                  <option value="house">Casa</option>
                  <option value="apartment">Departamento</option>
                  <option value="lot">Lote / Terreno</option>
                  <option value="commercial">Comercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-1">Detalles Adicionales</label>
                <textarea rows="4" className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none" placeholder="Cualquier información útil (superficie, estado, etc.)"></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-accent-600 hover:bg-accent-500 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? 'Enviando...' : (
                    <>
                      <Send size={20} />
                      Enviar Solicitud
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
