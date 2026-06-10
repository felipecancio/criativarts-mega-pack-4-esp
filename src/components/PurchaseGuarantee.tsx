import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";

export default function PurchaseGuarantee() {
  return (
    <section className="py-16 md:py-20 bg-black border-y border-white/5" id="garantia">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] px-6 py-8 text-center sm:rounded-[32px] sm:px-10 sm:py-10"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-500/[0.04] via-transparent to-transparent"
            aria-hidden
          />

          <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <ShieldCheck className="h-7 w-7 text-emerald-400" strokeWidth={2} />
          </div>

          <p className="relative mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
            Garantía de compra segura
          </p>

          <h2 className="relative mb-4 text-2xl font-black uppercase italic tracking-tight text-white sm:text-3xl">
            Compra con total tranquilidad
          </h2>

          <p className="relative mx-auto max-w-xl text-sm font-medium leading-relaxed text-gray-400 sm:text-base">
            Tu compra está protegida. Si no es lo que esperabas, puedes cancelar en cualquier
            momento, por cualquier motivo y{" "}
            <span className="text-gray-200">sin tener que dar explicaciones</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
