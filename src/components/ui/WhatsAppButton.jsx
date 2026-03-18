import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const whatsappNumber = "5492284468117"; // El número que me pasaste antes
  const defaultMessage = "Hola Inmobiliaria Loos, me contacto desde la web. Me gustaría hacer una consulta.";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip automatically 3 seconds after page loads
    const timer = setTimeout(() => {
      setShowTooltip(true);
      // Hide it after 6 seconds to not be annoying
      setTimeout(() => setShowTooltip(false), 6000);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 pointer-events-none">
      {/* Tooltip / Speech Bubble */}
      <div 
        className={`bg-white text-primary-900 border border-border shadow-xl px-4 py-3 rounded-2xl rounded-br-sm text-sm font-bold w-48 mb-2 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] origin-bottom-right ${showTooltip ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        <p>¿Necesitás ayuda?</p>
        <p className="text-muted-foreground font-medium text-xs mt-1 leading-tight">¡Cualquier cosa me hablás por acá!</p>
      </div>

      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="pointer-events-auto bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] transition-all hover:scale-110 flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png" 
          alt="WhatsApp Logo" 
          className="w-8 h-8 object-contain drop-shadow-sm"
        />
      </button>
    </div>
  );
}
