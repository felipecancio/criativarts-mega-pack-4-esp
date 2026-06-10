import { motion } from "motion/react";
import { Folder, FileImage, ShieldCheck, Monitor, Download, Package } from "lucide-react";

export default function WhatIsIncluded() {
  const items = [
    { icon: <FileImage className="text-purple-400" />, title: "+40 mil diseños PNG/JPG", desc: "Alta resolución, hasta impresión de 2,5 metros." },
    { icon: <Folder className="text-green-400" />, title: "65 temas organizados", desc: "Carpetas por categoría en Google Drive." },
    { icon: <ShieldCheck className="text-yellow-400" />, title: "Libre de derechos", desc: "Uso comercial tranquilo en tus creaciones." },
    { icon: <Monitor className="text-pink-400" />, title: "Acceso vitalicio", desc: "Un solo pago. Sin mensualidades." },
    { icon: <Download className="text-blue-400" />, title: "Entrega inmediata", desc: "Enlace por correo y WhatsApp al comprar." },
    { icon: <Package className="text-cyan-400" />, title: "3 bonos incluidos", desc: "Money Dollar, Funko y fútbol sin costo extra." },
  ];

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden" id="incluido">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
            ¿Qué incluye el Mega Pack 4.0?
          </h2>
          <p className="text-gray-500 mt-4 font-bold text-sm tracking-widest uppercase">
            Todo lo que necesitas en un solo lugar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="p-8 rounded-[32px] bg-white/[0.03] border border-white/5 flex flex-col items-center text-center group transition-colors hover:border-white/20"
            >
              <div className="mb-6 p-4 rounded-2xl bg-white/5 group-hover:bg-white group-hover:text-black transition-all">
                {item.icon}
              </div>
              <h4 className="text-white font-black text-xl mb-2 tracking-tight uppercase italic">{item.title}</h4>
              <p className="text-gray-500 text-sm font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
