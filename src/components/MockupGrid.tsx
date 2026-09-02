import GreenCTAButton from "./GreenCTAButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const SLIDE_COUNT = 14;
const GAP_PX = 16;
const AUTOPLAY_MS = 5000;
const slides = Array.from({ length: SLIDE_COUNT }, (_, i) => `/mockup-carousel/${i + 1}.webp`);

export default function MockupGrid() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(1);
  const [slideW, setSlideW] = useState(0);
  const [index, setIndex] = useState(0);
  const [autoplayReset, setAutoplayReset] = useState(0);

  const measure = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const isLg = window.matchMedia("(min-width: 1024px)").matches;
    const vis = isLg ? 4 : 1;
    const sw = vis === 1 ? w : (w - GAP_PX * 3) / 4;
    setVisible(vis);
    setSlideW(sw);
  }, []);

  useLayoutEffect(() => {
    measure();
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => measure();
    mq.addEventListener("change", onMq);
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => {
      mq.removeEventListener("change", onMq);
      ro.disconnect();
    };
  }, [measure]);

  const maxIndex = Math.max(0, SLIDE_COUNT - visible);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [maxIndex, autoplayReset]);

  const offsetPx = index * (slideW + GAP_PX);

  const resetAutoplay = () => setAutoplayReset((n) => n + 1);

  const goPrev = () => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
    resetAutoplay();
  };

  const goNext = () => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    resetAutoplay();
  };

  return (
    <section className="py-24 bg-[#0a0a0a]" id="mockups">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase italic tracking-tighter">
            En el <span className="text-purple-400">Mega Pack 4.0</span> encuentras todos los diseños que buscas
          </h2>
          <div className="mx-auto max-w-2xl text-sm text-gray-500 sm:text-base">
            <p>
              Solo en Mega Pack obtienes calidad y cantidad al mismo tiempo. Aunque se trata de una colección enorme, cada diseño fue seleccionado cuidadosamente para que aproveches al máximo su potencial.
            </p>
          </div>
        </div>

        <div className="relative px-11 sm:px-12 md:px-14 lg:px-16">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-lg backdrop-blur-md transition hover:border-white/30 hover:bg-white/10 md:h-12 md:w-12"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Siguiente"
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-lg backdrop-blur-md transition hover:border-white/30 hover:bg-white/10 md:h-12 md:w-12"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={2} />
          </button>

          <div
            ref={viewportRef}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
          >
            {slideW > 0 ? (
              <div
                className="flex transition-transform duration-[550ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{ gap: GAP_PX, transform: `translateX(-${offsetPx}px)` }}
              >
                {slides.map((src, i) => (
                  <div
                    key={src}
                    className="group relative aspect-[3/4] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/40"
                    style={{ width: slideW }}
                  >
                    <img
                      src={src}
                      alt={`Muestra de diseño Mega Pack 4.0 ${i + 1}`}
                      width={600}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      draggable={false}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="aspect-[3/4] w-full rounded-xl bg-white/[0.04]" aria-hidden />
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="mx-auto mb-5 max-w-2xl text-sm font-medium leading-relaxed text-gray-400 sm:text-base">
            Diseños nuevos, exclusivos y libres de derechos de autor. Listos para impulsar tu negocio desde hoy.
          </p>
          <GreenCTAButton>QUIERO ACCESO</GreenCTAButton>
        </div>
      </div>
    </section>
  );
}
