import { motion } from "motion/react";
import GreenCTAButton from "./GreenCTAButton";
import { MEGAPACK_THEMES } from "../data/megapackThemes";

const tiles = [
  {
    src: "/design-gallery/saiyan.png",
    alt: "Arte alta resolución — estilo anime",
    mobileOrder: "order-0",
    desktopOrder: "md:order-0",
  },
  {
    src: "/design-gallery/supreme-bart.png",
    alt: "Arte para camiseta — diseño urbano",
    mobileOrder: "order-1",
    desktopOrder: "md:order-1",
  },
  {
    src: "/design-gallery/nike-abstract.png",
    alt: "Arte abstracta para estampado",
    mobileOrder: "order-2",
    desktopOrder: "md:order-3",
  },
  {
    src: "/design-gallery/mickey-adidas.png",
    alt: "Arte infantil para producto personalizado",
    mobileOrder: "order-3",
    desktopOrder: "md:order-2",
  },
  {
    src: "/design-gallery/minnie-nike.png",
    alt: "Arte decorativa alta resolución",
    mobileOrder: "order-4",
    desktopOrder: "md:order-5",
  },
  {
    src: "/design-gallery/pikachu-nike.png",
    alt: "Arte tendencia para camiseta",
    mobileOrder: "order-5",
    desktopOrder: "md:order-4",
  },
  {
    src: "/design-gallery/hand-supreme.png",
    alt: "Arte streetwear para impresión",
    mobileOrder: "order-6",
    desktopOrder: "md:order-6",
  },
  {
    src: "/design-gallery/stitch-nike.png",
    alt: "Arte personajes — pack Mega 4.0",
    mobileOrder: "order-7",
    desktopOrder: "md:order-7",
  },
  {
    src: "/design-gallery/homer-nike.png",
    alt: "Arte humorística para cuadros y camisetas",
    mobileOrder: "order-8",
    desktopOrder: "md:order-8",
  },
  {
    src: "/design-gallery/snorlax-nike.png",
    alt: "Arte gaming para productos personalizados",
    mobileOrder: "order-9",
    desktopOrder: "md:order-9",
  },
  {
    src: "/design-gallery/adidas-originals.png",
    alt: "Arte deportiva alta resolución",
    mobileOrder: "order-10",
    desktopOrder: "md:order-11",
  },
  {
    src: "/design-gallery/stitch-supreme.png",
    alt: "Arte exclusiva Criativarts",
    mobileOrder: "order-11",
    desktopOrder: "md:order-10",
  },
];

export default function DesignGallery() {
  return (
    <section className="py-24 bg-black overflow-hidden" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none mb-4" id="temas">
              LOS 65 TEMAS DEL <span className="text-purple-500">MEGA PACK 4.0</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium">
              Una muestra visual del material. Más de 40 mil artes organizadas por carpetas — descarga poco a poco o todo de una vez.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4 shrink-0">
            <span className="text-3xl font-black text-white tabular-nums">65</span>
            <span className="text-white text-xs font-black uppercase tracking-widest leading-tight">
              temas modernos <br />
              y creativos
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-14">
          {tiles.map((tile, index) => (
            <motion.div
              key={tile.src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`relative aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 group ${tile.mobileOrder} ${tile.desktopOrder}`}
            >
              <img
                src={tile.src}
                alt={tile.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                draggable={false}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[32px] border border-white/10 bg-white/[0.02] p-6 sm:p-8"
        >
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6">
            Catálogo completo incluido en tu acceso
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
            {MEGAPACK_THEMES.map((theme) => (
              <span
                key={theme}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-gray-300 transition hover:border-purple-500/40 hover:text-white sm:text-xs"
              >
                {theme}
              </span>
            ))}
          </div>
          <div className="mt-8 text-center">
            <GreenCTAButton>QUIERO ACCEDER</GreenCTAButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
