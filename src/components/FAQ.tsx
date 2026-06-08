import { motion } from "motion/react";
import { PlusCircle } from "lucide-react";

const faqs = [
  {
    q: "¿Cómo recibo el material?",
    a: "El material se envía inmediatamente al correo electrónico que utilizaste en la compra. Allí tendrás acceso al enlace de nuestro drive privado y podrás acceder siempre que quieras.",
  },
  {
    q: "¿El acceso tiene tiempo limitado?",
    a: "¡No! El acceso es vitalicio y podrás descargar las artes a medida que las necesites.",
  },
  {
    q: "¿Puedo usar las artes en cualquier tipo de trabajo?",
    a: "Sí, todos los tipos de trabajos que necesiten artes en alta resolución que puedan alcanzar tamaños grandes están cubiertos por este material.",
  },
  {
    q: "¿Cuál es el formato de los archivos?",
    a: "Las imágenes son archivos PNG de alta calidad con dimensiones de 4200 x 6200 píxeles. Pueden ser impresas por encima de 2 metros de tamaño manteniendo la calidad intacta.",
  },
  {
    q: "¿Y qué hay de los derechos de autor?",
    a: "Todas las imágenes fueron imaginadas y desarrolladas por nosotros en Criativarts. Son libres de derechos de autor y pueden utilizarse tranquilamente en tus creaciones.",
  },
  {
    q: "¿La compra es segura?",
    a: "¡Sí! La compra es 100% segura y mediada por la plataforma de Hotmart, la mayor plataforma de infoproductos de América.",
  },
  {
    q: "¿Tengo garantía?",
    a: "¡Con certeza! Asumimos el compromiso de devolverte íntegramente tu pago si no estás 100% feliz con el material. Podrás solicitar este reembolso en cualquier momento y te devolveremos tu dinero sin preguntas.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24 bg-black" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.details
              key={index}
              className="group border border-white/10 rounded-2xl bg-white/[0.02] p-6 cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <summary className="flex items-center justify-between list-none gap-4">
                <span className="text-base sm:text-lg font-bold text-white group-open:text-purple-400 transition-colors uppercase tracking-tight text-left">
                  {String(index + 1).padStart(2, "0")}. {faq.q}
                </span>
                <PlusCircle className="text-white group-open:rotate-45 transition-transform shrink-0" />
              </summary>
              <div className="mt-4 text-gray-400 text-base leading-relaxed">{faq.a}</div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
