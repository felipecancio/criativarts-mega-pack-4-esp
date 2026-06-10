import { motion } from "motion/react";
import { Check, Zap, Shield, Rocket } from "lucide-react";
import FloatingProductBox from "./FloatingProductBox";

const HOTMART_CHECKOUT =
  "https://pay.hotmart.com/P104382859N?off=4f36ap0g&checkoutMode=10";

const offerChecklist = [
  "Más de 40 mil diseños inéditos en alta resolución hasta 2,5 m",
  "65 temas modernos y creativos",
  "Diseños PNG y JPG (300 DPI / alta resolución)",
  "100% libre de derechos de autor",
  "Cuadros, camisetas y todo trabajo en gran formato",
  "Bono 1: Mega Pack Money Dollar (100 diseños)",
  "Bono 2: Mega Pack Funko (mil diseños)",
  "Bono 3: Mega Pack Fútbol (300 diseños)",
  "Pago único · envío inmediato por e-mail y WhatsApp",
  "Acceso vitalicio por Drive con soporte diferenciado",
];

export default function PricingCTA() {
  return (
    <section className="scroll-mt-24 py-24 bg-black relative overflow-hidden" id="comprar">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/[0.03] border border-white/10 rounded-[40px] overflow-hidden p-8 md:p-16 text-center shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/[0.08] border border-orange-500/20 text-[10px] font-black text-orange-200 mb-6 tracking-[0.12em] uppercase">
            <span className="text-sm leading-none" aria-hidden>
              ⏳
            </span>
            ¡Atención, esta oferta ya va a terminar!
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter italic">
            MEGA PACK 4.0
          </h2>

          <p className="text-xl md:text-2xl font-bold text-gray-300 mb-2">
            40 mil diseños en alta resolución
          </p>

          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto font-medium">
            Adquiere ahora en el lanzamiento con un{" "}
            <span className="text-emerald-400 font-black">50% de descuento</span>. Pago único, entrega instantánea y
            garantía de riesgo cero.
          </p>

          <div className="mb-10 flex flex-col items-center">
            <FloatingProductBox size="xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left max-w-2xl mx-auto mb-12">
            {offerChecklist.map((text, i) => (
              <div key={i} className="flex items-start gap-3 text-gray-300 font-bold text-sm">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-green-500" />
                </div>
                {text}
              </div>
            ))}
          </div>

          <p className="mx-auto mb-3 max-w-md text-center text-sm font-medium leading-relaxed text-gray-500 sm:mb-4 sm:text-base">
            Mira el precio en tu moneda al hacer clic en el botón · Checkout seguro Hotmart
          </p>

          <motion.a
            href={HOTMART_CHECKOUT}
            rel="noopener noreferrer"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(16, 185, 129, 0.32), 0 10px 36px rgba(5, 150, 105, 0.42)",
                "0 0 10px 2px rgba(52, 211, 153, 0.32), 0 11px 38px rgba(5, 150, 105, 0.46)",
                "0 0 20px 5px rgba(52, 211, 153, 0.42), 0 14px 46px rgba(5, 150, 105, 0.52)",
                "0 0 34px 10px rgba(52, 211, 153, 0.5), 0 18px 54px rgba(5, 150, 105, 0.58)",
                "0 0 20px 5px rgba(52, 211, 153, 0.42), 0 14px 46px rgba(5, 150, 105, 0.52)",
                "0 0 10px 2px rgba(52, 211, 153, 0.32), 0 11px 38px rgba(5, 150, 105, 0.46)",
                "0 0 0 0 rgba(16, 185, 129, 0.32), 0 10px 36px rgba(5, 150, 105, 0.42)",
              ],
              filter: [
                "brightness(1)",
                "brightness(1.012)",
                "brightness(1.03)",
                "brightness(1.05)",
                "brightness(1.03)",
                "brightness(1.012)",
                "brightness(1)",
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: [0.42, 0, 0.58, 1],
              times: [0, 0.14, 0.32, 0.5, 0.68, 0.86, 1],
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative w-full sm:w-auto inline-flex bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-700 text-white px-8 py-5 text-xl sm:px-12 sm:py-6 sm:text-2xl rounded-2xl font-black items-center justify-center gap-2 sm:gap-3 border border-emerald-300/40 mb-6 uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] hover:from-emerald-300 hover:via-green-400 hover:to-emerald-600 transition-colors whitespace-nowrap"
          >
            <Zap className="h-7 w-7 shrink-0 fill-white text-white sm:h-8 sm:w-8" />
            COMPRAR AHORA
          </motion.a>

          <div className="flex flex-nowrap justify-center items-center gap-3 sm:gap-6 opacity-40 max-sm:text-[10px] sm:text-xs">
            <div className="flex shrink-0 items-center gap-1.5 text-white font-bold uppercase tracking-wide sm:tracking-widest sm:gap-2">
              <Shield className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" /> Pago 100% seguro
            </div>
            <div className="flex shrink-0 items-center gap-1.5 text-white font-bold uppercase tracking-wide sm:tracking-widest sm:gap-2">
              <Rocket className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" /> Entrega instantánea
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
