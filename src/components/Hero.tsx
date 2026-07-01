import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Download } from "lucide-react";
import HeroVideoPlayer from "./HeroVideoPlayer";

const checklist = [
  { label: "PNG + JPG · 300 DPI", icon: <CheckCircle2 className="w-4 h-4 shrink-0 text-green-500" /> },
  { label: "Acceso de por vida", icon: <CheckCircle2 className="w-4 h-4 shrink-0 text-green-500" /> },
  { label: "Alta resolución", icon: <CheckCircle2 className="w-4 h-4 shrink-0 text-green-500" /> },
  { label: "Libre de derechos", icon: <CheckCircle2 className="w-4 h-4 shrink-0 text-green-500" /> },
];

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-black" id="hero">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-y-6 max-lg:justify-items-center max-lg:gap-y-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:grid-rows-[auto_auto_auto] lg:justify-items-stretch lg:gap-x-10 lg:gap-y-3 lg:items-center">
          <div className="order-1 min-w-0 w-full max-w-xl max-lg:mx-auto max-lg:text-center lg:order-none lg:col-start-1 lg:row-start-1 lg:max-w-none lg:pr-4 lg:text-left">
            <div className="mb-4 inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-3.5 backdrop-blur-sm max-lg:mx-auto sm:gap-3 sm:py-2 sm:pl-2 sm:pr-4">
              <span
                className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-500/25 bg-gradient-to-br from-amber-500/15 via-purple-500/10 to-transparent text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:h-9 sm:w-9 sm:text-lg"
                aria-hidden
              >
                💎
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-pulse rounded-full bg-amber-400 ring-2 ring-black/80" />
              </span>
              <span className="min-w-0 text-left text-[10px] font-semibold leading-snug text-gray-200 sm:text-xs">
                Actualizado constantemente con nuevos diseños
              </span>
            </div>

            <h1 className="mb-5 max-w-xl text-[2.35rem] font-black leading-[1.08] tracking-tight text-white max-lg:mx-auto sm:text-[2.75rem] sm:leading-[1.06] md:mb-6 md:text-5xl lg:mx-0 lg:text-[3.5rem] lg:leading-[1.05]">
              +40.000
              <br />
              DISEÑOS EN{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-rose-950">
                ALTA RESOLUCIÓN
              </span>
            </h1>

            <p className="mb-0 max-w-lg text-base leading-relaxed text-gray-400 max-lg:mx-auto md:text-lg lg:mx-0">
              Un arsenal de diseños exclusivos para crear productos que destacan y venden más. Son +40 mil diseños JPG/PNG en alta calidad, 65 temas en tendencia e impresión hasta 2,5 metros. Acceso vitalicio por Drive, sin cuotas y garantía total o tu dinero de vuelta.
            </p>
          </div>

          <div className="relative order-2 min-w-0 w-full max-w-xl max-lg:my-4 lg:order-none lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:max-w-none lg:self-center">
            <div className="relative z-10 w-full">
              <HeroVideoPlayer />
            </div>
            <div className="pointer-events-none absolute inset-0 -z-10 bg-purple-500/10 rounded-full blur-[100px] max-lg:hidden" aria-hidden />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="order-3 min-w-0 w-full max-w-xl max-lg:mx-auto max-lg:text-center lg:order-none lg:col-start-1 lg:row-start-2 lg:row-span-2 lg:max-w-none lg:pr-4 lg:text-left"
          >
            <p className="mb-4 max-w-lg text-sm leading-relaxed text-gray-400 max-lg:mx-auto max-lg:text-center sm:text-base lg:mx-0 lg:mb-6 lg:text-left">
              Ideal para cuadros, camisetas, tazas, pósters y todo tipo de productos personalizados.
            </p>
            <div className="mb-10 max-lg:mb-0 lg:mb-10">
              <p className="mb-4 max-w-lg text-sm leading-relaxed text-gray-400 max-lg:mx-auto max-lg:text-center sm:text-base lg:mx-0 lg:mb-6 lg:text-left">
                Recibe tu acceso de forma fácil y rápida directamente en tu correo electrónico y WhatsApp. Compra hoy y
                obtén todas las futuras actualizaciones GRATIS.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-nowrap lg:items-stretch lg:justify-start">
              <motion.a
                href="#comprar"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(16, 185, 129, 0.35), 0 10px 32px rgba(5, 150, 105, 0.4)",
                    "0 0 30px 8px rgba(52, 211, 153, 0.48), 0 14px 44px rgba(5, 150, 105, 0.52)",
                  ],
                  filter: ["brightness(1)", "brightness(1.07)"],
                }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative shrink-0 whitespace-nowrap inline-flex bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-700 px-6 py-4 text-base font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors hover:from-emerald-300 hover:via-green-400 hover:to-emerald-600 items-center justify-center gap-2 rounded-2xl border border-emerald-300/40 lg:px-8 lg:text-lg"
              >
                QUIERO EL MEGA PACK 4.0 <ArrowRight className="h-5 w-5 shrink-0 text-white" />
              </motion.a>
              <a
                href="#gallery"
                className="hidden shrink-0 whitespace-nowrap rounded-2xl border border-transparent bg-white px-6 py-4 text-base font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all hover:bg-gray-200 md:flex items-center justify-center gap-2 lg:px-8 lg:text-lg"
              >
                VER TEMAS <Download className="h-5 w-5 shrink-0 text-black" />
              </a>
              </div>
            </div>

            <div className="grid max-lg:mx-auto max-lg:mt-8 max-lg:max-w-sm grid-cols-2 gap-x-4 gap-y-3 lg:mx-0 lg:mt-0 lg:max-w-none lg:grid-cols-4 lg:gap-x-6 lg:gap-y-0">
              {checklist.map((item, i) => (
                <div key={i} className="flex min-w-0 items-center justify-center gap-2 text-xs font-medium text-gray-400 sm:text-sm lg:justify-start lg:text-sm">
                  {item.icon}
                  <span className="leading-snug">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
