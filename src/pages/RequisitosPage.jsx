import { CheckCircle2, Download, HelpCircle, FileText } from 'lucide-react';

export default function RequisitosPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-primary-900 mb-4">
          Requisitos para Alquilar
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Toda la documentación y pasos necesarios para que puedas ingresar a tu próximo hogar de forma rápida y segura.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Documentación section */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-border">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
            <div className="bg-primary-100 text-primary-700 p-3 rounded-xl">
               <FileText size={28} />
            </div>
            <h2 className="text-2xl font-bold text-foreground font-heading">Documentación Requerida</h2>
          </div>
          
          <ul className="space-y-6">
            <li className="flex gap-4">
              <CheckCircle2 className="text-accent-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-foreground">DNI (Locatario y Garantes)</h3>
                <p className="text-muted-foreground text-sm mt-1">Fotocopia del frente y reverso del Documento Nacional de Identidad de todas las partes involucradas.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <CheckCircle2 className="text-accent-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-foreground">Recibos de Sueldo del Locatario</h3>
                <p className="text-muted-foreground text-sm mt-1">Últimos 3 recibos de sueldo. Los ingresos totales demostrables deben triplicar el valor del alquiler mensual.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <CheckCircle2 className="text-accent-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-foreground">2 Garantes con Recibo de Sueldo</h3>
                <p className="text-muted-foreground text-sm mt-1">Opcionalmente, se puede presentar 1 garantía propietaria (inmueble libre de deuda) en lugar de los recibos.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <CheckCircle2 className="text-accent-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-foreground">Mes de Adelanto y Depósito</h3>
                <p className="text-muted-foreground text-sm mt-1">Abonar un mes por adelantado y un mes en concepto de depósito en garantía al firmar el contrato.</p>
              </div>
            </li>
          </ul>

          <div className="mt-8 pt-8 border-t border-border">
            <button className="w-full bg-primary-900 hover:bg-primary-800 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-3">
              <Download size={20} />
              Descargar Guía Completa (PDF)
            </button>
          </div>
        </div>

        {/* FAQs section */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-border">
            <div className="flex items-center gap-4 mb-6">
              <HelpCircle className="text-primary-500 flex-shrink-0" size={28} />
              <h2 className="text-2xl font-bold text-foreground font-heading">Preguntas Frecuentes</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-foreground mb-2">¿Puedo ingresar si soy Monotributista?</h4>
                <p className="text-sm text-muted-foreground">Sí, se puede ingresar presentando los últimos 6 pagos del monotributo e ingresos brutos, certificación contable de ingresos y una antigüedad mínima de un año.</p>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2">¿Se aceptan mascotas?</h4>
                <p className="text-sm text-muted-foreground">Depende exclusivamente del consorcio y/o del propietario del inmueble. Debe consultarse específicamente por la propiedad de interés.</p>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2">¿Cuáles son los gastos de una firma de contrato?</h4>
                <p className="text-sm text-muted-foreground">Además del mes de adelanto y depósito, se cobran honorarios inmobiliarios (4% del contrato total) y gastos de sellado y averiguación de garantías.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-primary-50 p-8 rounded-2xl border border-primary-100 text-center">
            <h3 className="font-bold text-primary-900 text-xl mb-2">¿Tenés un caso particular?</h3>
            <p className="text-primary-700 text-sm mb-6">Comunicate con uno de nuestros asesores y analizaremos cómo podemos ayudarte a concretar el alquiler.</p>
            <a href="https://wa.me/5492284468117" className="inline-block bg-white text-primary-900 font-bold px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow">
              Consultar Asesor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
