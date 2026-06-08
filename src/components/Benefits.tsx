import { motion } from "motion/react";
import GreenCTAButton from "./GreenCTAButton";
import {
  Zap,
  Clock,
  ShieldCheck,
  Download,
  Package,
  Sparkles,
  Layout,
  Printer,
  TrendingUp,
  Target,
  Wallet,
} from "lucide-react";

const pillars = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Banco de imágenes perfecto",
    desc: "Atiende cualquier pedido de cliente con una súper variedad de imágenes populares en este momento.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Acaba con la competencia",
    desc: "El contenido exclusivo te pondrá por delante con un trabajo de valor y diferenciado.",
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    title: "Más ventas, más ganancias",
    desc: "Alcanza nuevos clientes, vende más y aumenta tu margen usando artes diferentes a todas las demás.",
  },
];

const benefits = [
  { icon: <Package />, title: "+40 mil artes", desc: "65 temas actuales con alta variedad y enfoque en tendencias." },
  { icon: <Printer />, title: "Alta resolución", desc: "~5 MB por archivo, 4100×6100 px — impresión hasta 2,5 metros." },
  { icon: <ShieldCheck />, title: "Libre de derechos", desc: "100% original Criativarts. Uso comercial tranquilo en tus creaciones." },
  { icon: <Download />, title: "Acceso inmediato", desc: "Enlace al Drive por correo y WhatsApp. Un solo pago, sin mensualidades." },
  { icon: <Layout />, title: "Organizado", desc: "Carpetas por tema. Descarga parcial o completa, como prefieras." },
  { icon: <Zap />, title: "Listo para imprimir", desc: "Cuadros, camisetas, paneles, adhesivos, azulejos, papel tapiz y más." },
  { icon: <Clock />, title: "Soporte vitalicio", desc: "Acompañamiento postventa para que aproveches todo el material." },
  { icon: <Sparkles />, title: "Riesgo cero", desc: "¿No estás 100% satisfecho? Reembolso íntegro, sin preguntas." },
];

export default function Benefits() {
  return (
    <section className="py-24 bg-black border-y border-white/5" id="beneficios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-4">
            ¡Lleva tu negocio al <span className="text-purple-500">siguiente nivel!</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
            Deja de buscar las mismas imágenes que todo el mundo usa. Asegura un arsenal original y diferenciado en alta resolución.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="p-8 rounded-[32px] bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-300 mx-auto mb-5">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3 italic">{pillar.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-4 group-hover:bg-white transition-colors group-hover:text-black">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <GreenCTAButton>QUIERO EL MEGA PACK 4.0</GreenCTAButton>
        </div>
      </div>
    </section>
  );
}
