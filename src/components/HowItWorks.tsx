import { motion } from "motion/react";
import { UserPlus, Mail, Download, Rocket } from "lucide-react";

const steps = [
  {
    icon: <UserPlus />,
    title: "Paso 1",
    text: "Adquiere el Mega Pack 4.0 con pago único y seguro en Hotmart.",
    label: "COMPRAS",
  },
  {
    icon: <Mail />,
    title: "Paso 2",
    text: "Recibe el enlace de acceso al Drive en tu correo y WhatsApp al instante.",
    label: "ACCESO",
  },
  {
    icon: <Download />,
    title: "Paso 3",
    text: "Descarga las artes por carpetas, poco a poco o todo de una vez. Acceso vitalicio.",
    label: "DESCARGAS",
  },
  {
    icon: <Rocket />,
    title: "Paso 4",
    text: "Empieza a vender cuadros, camisetas y productos con artes exclusivas hoy mismo.",
    label: "VENDES",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#0a0a0a]" id="metodo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 italic uppercase">¿Cómo recibes el material?</h2>
          <p className="text-gray-500 max-w-xl mx-auto font-medium">
            Entrega inmediata, sin cuotas mensuales y con soporte diferenciado por Criativarts.
          </p>
          <div className="w-24 h-1 bg-white mx-auto rounded-full mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-12 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative z-10 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-black border-2 border-white/10 flex items-center justify-center text-white mx-auto mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white transition-colors transform hover:-translate-y-2 duration-300">
                {step.icon}
              </div>
              <span className="inline-block bg-white text-black px-3 py-1 rounded text-[10px] font-black mb-4 tracking-widest">
                {step.label}
              </span>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm px-4">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
