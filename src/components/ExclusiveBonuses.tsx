import { useState } from "react";
import { motion } from "motion/react";
import GreenCTAButton from "./GreenCTAButton";
import { CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const BONUS_BULLET = "Bonus Pack incluido sin costo adicional";

const bonuses = [
  {
    tag: "BONO 1",
    title: "Mega Pack Money Dollar",
    subtitle: "100 diseños exclusivos",
    mockupImage: "/bonus-images/mockups/bonus-money-dollar-mockup.webp",
    previewImage: "/bonus-images/bonus-money-dollar.png",
    imageAlt: "Mega Pack Money Dollar — billetes y temáticas de dinero y lujo",
    description:
      "100 diseños exclusivos de billetes de dólar y temáticas relacionadas con dinero y lujo. Perfecto para aumentar el valor percibido de tus productos.",
    glow: "from-amber-500/20 via-orange-500/10 to-transparent",
  },
  {
    tag: "BONO 2",
    title: "Mega Pack Funkos",
    subtitle: "1.000 diseños exclusivos",
    mockupImage: "/bonus-images/bonus-funkos-mockup.webp",
    previewImage: "/bonus-images/bonus-funkos.png",
    imageAlt: "Mega Pack Funkos — héroes, películas y series",
    description:
      "Mil diseños estilo FUNKO de temas como héroes, películas, series y artistas. Ideal para ampliar tu catálogo con piezas de alto impacto visual.",
    glow: "from-emerald-500/20 via-green-500/10 to-transparent",
  },
  {
    tag: "BONO 3",
    title: "Mega Pack Fútbol",
    subtitle: "300 diseños exclusivos",
    mockupImage: "/bonus-images/mockups/bonus-futbol-mockup.webp",
    previewImage: "/bonus-images/bonus-futbol.png",
    imageAlt: "Mega Pack Fútbol — equipos y estrellas",
    description:
      "300 diseños de equipos y estrellas del fútbol de Brasil y del mundo. Perfectas para camisetas, cuadros y productos deportivos.",
    glow: "from-purple-500/20 via-blue-500/10 to-transparent",
  },
] as const;

function BonusImageFrame({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`mx-auto block h-full max-h-[220px] w-auto max-w-full object-contain sm:max-h-[250px] lg:max-h-[280px] ${className}`}
      draggable={false}
      loading="lazy"
      decoding="async"
    />
  );
}

function BonusMockup({
  mockupImage,
  previewImage,
  imageAlt,
}: {
  mockupImage: string;
  previewImage: string;
  imageAlt: string;
}) {
  const [slide, setSlide] = useState(0);
  const [previewReady, setPreviewReady] = useState(false);

  const requestPreview = () => {
    setPreviewReady(true);
  };

  return (
    <div className="mb-6">
      {/* Desktop: hover swap — preview PNG só carrega no hover */}
      <div
        className="relative mb-0 hidden min-h-[220px] md:block lg:min-h-[280px]"
        onMouseEnter={requestPreview}
        onFocus={requestPreview}
      >
        <div className="flex min-h-[220px] items-center justify-center lg:min-h-[280px]">
          <BonusImageFrame
            src={mockupImage}
            alt={imageAlt}
            className="transition-opacity duration-300 group-hover:opacity-0"
          />
        </div>
        {previewReady && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <BonusImageFrame src={previewImage} alt={`${imageAlt} — vista previa`} />
          </div>
        )}
      </div>

      {/* Mobile: manual carousel */}
      <div className="relative md:hidden">
        <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden">
          <div
            className="flex w-full transition-transform duration-300 ease-out"
            style={{ transform: slide === 0 ? "translateX(0)" : "translateX(-100%)" }}
          >
            <div className="flex w-full shrink-0 items-center justify-center px-8">
              <BonusImageFrame src={mockupImage} alt={imageAlt} />
            </div>
            <div className="flex w-full shrink-0 items-center justify-center px-8">
              {previewReady ? (
                <BonusImageFrame src={previewImage} alt={`${imageAlt} — vista previa`} />
              ) : (
                <div className="min-h-[220px]" aria-hidden />
              )}
            </div>
          </div>

          {slide === 0 && (
            <button
              type="button"
              onClick={() => {
                requestPreview();
                setSlide(1);
              }}
              className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-lg backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10"
              aria-label="Ver vista previa del bonus"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
            </button>
          )}

          {slide === 1 && (
            <button
              type="button"
              onClick={() => setSlide(0)}
              className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-lg backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10"
              aria-label="Volver al mockup del bonus"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExclusiveBonuses() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-24" id="bonos">
      <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 rounded-full bg-purple-600/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-white">
            <Sparkles className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            3 regalos especiales
          </div>

          <h2 className="text-4xl font-black uppercase italic leading-none tracking-tighter text-white md:text-6xl">
            Al adquirir el Mega Pack 4.0 hoy, aseguras estos bonos
          </h2>
          <p className="mt-4 font-medium text-gray-500">
            Disponibles por tiempo limitado al cerrar tu acceso ahora.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {bonuses.map((bonus, index) => (
            <motion.article
              key={bonus.tag}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-7 shadow-2xl transition-colors hover:border-white/20 hover:bg-white/[0.045] sm:p-8"
            >
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${bonus.glow} opacity-70 transition-opacity duration-500 group-hover:opacity-100`}
              />
              <div className="relative z-10">
                <div className="mb-6 flex items-start justify-between">
                  <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-gray-300">
                    {bonus.tag}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                    {bonus.subtitle}
                  </span>
                </div>

                <h3 className="mb-4 text-2xl font-black uppercase italic leading-tight tracking-tight text-white">
                  {bonus.title}
                </h3>

                <BonusMockup
                  mockupImage={bonus.mockupImage}
                  previewImage={bonus.previewImage}
                  imageAlt={bonus.imageAlt}
                />

                <p className="mb-7 text-[15px] font-medium leading-relaxed text-gray-400 sm:text-base">
                  {bonus.description}
                </p>

                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm font-bold leading-snug text-gray-300">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span>{BONUS_BULLET}</span>
                  </li>
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mx-auto mt-12 max-w-2xl text-center"
        >
          <p className="mb-6 text-base font-black leading-relaxed text-white sm:text-lg">
            ¡Asegura ahora el acceso para recibir todos los bonos que están disponibles por tiempo limitado!
          </p>
          <GreenCTAButton>QUIERO RECIBIR LOS BONOS</GreenCTAButton>
        </motion.div>
      </div>
    </section>
  );
}
