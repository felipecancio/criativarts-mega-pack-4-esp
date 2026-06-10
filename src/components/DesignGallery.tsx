import { motion } from "motion/react";
import GreenCTAButton from "./GreenCTAButton";
import { MEGAPACK_THEMES } from "../data/megapackThemes";

const GALLERY_COUNT = 27;
const DESKTOP_VISIBLE = 25;

const tiles = Array.from({ length: GALLERY_COUNT }, (_, i) => ({
  src: `/design-gallery/${i + 1}.webp`,
  alt: `Diseño exclusivo Mega Pack 4.0 — ${i + 1}`,
}));

function GalleryTile({
  tile,
  index,
}: {
  tile: (typeof tiles)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: (index % 15) * 0.03 }}
      viewport={{ once: true }}
      className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 sm:rounded-2xl"
    >
      <img
        src={tile.src}
        alt={tile.alt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        draggable={false}
        loading="lazy"
      />
    </motion.div>
  );
}

export default function DesignGallery() {
  const desktopTiles = tiles.slice(0, DESKTOP_VISIBLE);

  return (
    <section className="py-24 bg-black overflow-hidden" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none mb-4" id="temas">
              UN ARSENAL DE <span className="text-purple-500">DISEÑOS EXCLUSIVOS</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium">
              Una muestra visual del material. Más de 40 mil diseños organizados por carpetas — descarga poco a poco o todo de una vez.
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

        <div className="mb-14 grid grid-cols-3 gap-2 sm:gap-3 md:hidden">
          {tiles.map((tile, index) => (
            <GalleryTile key={tile.src} tile={tile} index={index} />
          ))}
        </div>

        <div className="mb-14 hidden md:grid md:grid-cols-5 md:gap-4">
          {desktopTiles.map((tile, index) => (
            <GalleryTile key={tile.src} tile={tile} index={index} />
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
