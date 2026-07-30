import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import GreenCTAButton from "./GreenCTAButton";
import { MEGAPACK_THEMES } from "../data/megapackThemes";

const GALLERY_COUNT = 27;
const DESKTOP_VISIBLE = 25;
const INITIAL_THEMES_VISIBLE = Math.ceil(MEGAPACK_THEMES.length / 3);

const themePillClass =
  "rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-gray-300 transition hover:border-purple-500/40 hover:text-white sm:text-xs";

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
  const [showAllThemes, setShowAllThemes] = useState(false);
  const visibleThemes = showAllThemes
    ? MEGAPACK_THEMES
    : MEGAPACK_THEMES.slice(0, INITIAL_THEMES_VISIBLE);
  const hiddenThemesCount = MEGAPACK_THEMES.length - INITIAL_THEMES_VISIBLE;

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

          {/* Mobile: primer tercio + expandir */}
          <div className="relative md:hidden">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
              <AnimatePresence initial={false}>
                {visibleThemes.map((theme, index) => (
                  <motion.span
                    key={theme}
                    layout
                    initial={
                      index >= INITIAL_THEMES_VISIBLE
                        ? { opacity: 0, scale: 0.92, y: 6 }
                        : false
                    }
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -4 }}
                    transition={{
                      duration: 0.28,
                      delay:
                        index >= INITIAL_THEMES_VISIBLE
                          ? (index - INITIAL_THEMES_VISIBLE) * 0.015
                          : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={themePillClass}
                  >
                    {theme}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>

            {!showAllThemes && hiddenThemesCount > 0 && (
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/95 to-transparent"
                aria-hidden
              />
            )}
          </div>

          <div className="mt-6 flex justify-center md:hidden">
            {showAllThemes ? (
              <button
                type="button"
                onClick={() => setShowAllThemes(false)}
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] text-gray-500 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-gray-300 sm:text-xs"
              >
                Ver menos temas
                <ChevronUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 sm:h-4 sm:w-4" />
              </button>
            ) : (
              hiddenThemesCount > 0 && (
                <button
                  type="button"
                  onClick={() => setShowAllThemes(true)}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] text-gray-500 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-gray-300 sm:text-xs"
                >
                  Ver todos los temas
                  <span className="font-bold tabular-nums text-gray-600 group-hover:text-gray-400">
                    +{hiddenThemesCount}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5 sm:h-4 sm:w-4" />
                </button>
              )
            )}
          </div>

          {/* Desktop: todos los temas visibles */}
          <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-2.5">
            {MEGAPACK_THEMES.map((theme) => (
              <span key={theme} className={themePillClass}>
                {theme}
              </span>
            ))}
          </div>

          <p className="mt-8 max-w-xl mx-auto text-center text-sm font-medium leading-relaxed text-gray-400 sm:text-base">
            Material 100% organizado y actualizado. Obtén acceso ahora y comienza a usarlo de inmediato.
          </p>

          <div className="mt-5 text-center">
            <GreenCTAButton id="nav-sticky-trigger">QUIERO ACCEDER</GreenCTAButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
