import { motion } from "motion/react";
import GreenCTAButton from "./GreenCTAButton";
import { Search, CheckCircle } from "lucide-react";

const checklist = [
  { t: "Cuadros, camisetas y más", d: "Paneles, adhesivos, azulejos, papel tapiz y cualquier artículo personalizado." },
  { t: "PNG y JPG · 300 DPI", d: "Dimensiones promedio 4100×6100 px — calidad para gran formato." },
  { t: "100% libre de derechos", d: "Diseños imaginados y desarrollados por Criativarts para uso comercial." },
];

function QualityImage({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={className}
    >
      <img
        src="/quality-dtf-print.png"
        alt="Calidad de impresión en gran formato — Mega Pack 4.0"
        className="w-full h-auto rounded-[40px] border border-white/10"
        draggable={false}
      />
    </motion.div>
  );
}

function QualityHeading() {
  return (
    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter italic uppercase leading-none">
      EN EL MEGA PACK 4.0 <br />
      <span className="text-gray-500">ENCONTRARÁS</span>
    </h2>
  );
}

function QualityParagraph() {
  return (
    <p className="text-gray-400 text-lg mb-6 leading-relaxed">
      Más de <span className="text-white font-bold">40 mil diseños</span> de{" "}
      <span className="text-white font-bold">65 temas</span> actuales. Tamaño promedio de 5 MB, perfectas para trabajos
      hasta 2,5 metros de impresión. Material organizado por carpetas, fácil de visualizar y descargar cuando quieras.
    </p>
  );
}

function QualityParagraph2() {
  return (
    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
      Acceso inmediato sin límite de tiempo, enlace por WhatsApp y correo, soporte vitalicio postventa. El riesgo es{" "}
      <span className="text-white font-bold">CERO</span>: si no estás 100% satisfecho, devolvemos tu dinero íntegramente,
      sin preguntas.
    </p>
  );
}

function QualityList() {
  return (
    <ul className="space-y-4">
      {checklist.map((item, i) => (
        <li key={i} className="flex gap-4">
          <div className="mt-1 shrink-0">
            <CheckCircle className="text-green-500 w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-black text-lg uppercase tracking-tight">{item.t}</h4>
            <p className="text-gray-500 text-sm">{item.d}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function QualityQuote() {
  return (
    <div className="mt-12 p-8 rounded-[32px] bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10">
      <div className="flex items-center gap-4 text-white">
        <Search className="w-10 h-10 shrink-0 text-purple-400" />
        <p className="font-bold italic">
          &quot;¡Assumimos este compromiso contigo! Si no estás 100% feliz con el material, te devolvemos íntegramente tu
          dinero.&quot;
        </p>
      </div>
      <p className="text-gray-400 text-xs mt-4 text-right">— Garantía Criativarts · Mega Pack 4.0</p>
    </div>
  );
}

export default function QualityProof() {
  return (
    <section className="py-24 bg-black overflow-hidden" id="calidad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:hidden">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <QualityHeading />
            <QualityParagraph />
            <QualityParagraph2 />
          </motion.div>
          <QualityImage />
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <QualityList />
            <QualityQuote />
          </motion.div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <QualityImage />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <QualityHeading />
            <QualityParagraph />
            <QualityParagraph2 />
            <QualityList />
            <QualityQuote />
          </motion.div>
        </div>

        <div className="mt-12 text-center lg:mt-16">
          <GreenCTAButton>YO QUIERO</GreenCTAButton>
        </div>
      </div>
    </section>
  );
}
