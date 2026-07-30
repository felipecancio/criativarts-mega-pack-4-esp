import { motion } from "motion/react";
import { Zap, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

const pulseAnimation = {
  boxShadow: [
    "0 0 0 0 rgba(16, 185, 129, 0.32), 0 8px 28px rgba(5, 150, 105, 0.38)",
    "0 0 8px 2px rgba(52, 211, 153, 0.28), 0 9px 30px rgba(5, 150, 105, 0.42)",
    "0 0 16px 4px rgba(52, 211, 153, 0.38), 0 12px 38px rgba(5, 150, 105, 0.48)",
    "0 0 26px 8px rgba(52, 211, 153, 0.45), 0 15px 44px rgba(5, 150, 105, 0.52)",
    "0 0 16px 4px rgba(52, 211, 153, 0.38), 0 12px 38px rgba(5, 150, 105, 0.48)",
    "0 0 8px 2px rgba(52, 211, 153, 0.28), 0 9px 30px rgba(5, 150, 105, 0.42)",
    "0 0 0 0 rgba(16, 185, 129, 0.32), 0 8px 28px rgba(5, 150, 105, 0.38)",
  ],
  filter: [
    "brightness(1)",
    "brightness(1.012)",
    "brightness(1.03)",
    "brightness(1.05)",
    "brightness(1.03)",
    "brightness(1.012)",
    "brightness(1)",
  ],
};

const pulseTransition = {
  duration: 6,
  repeat: Infinity,
  ease: [0.42, 0, 0.58, 1] as const,
  times: [0, 0.14, 0.32, 0.5, 0.68, 0.86, 1],
};

type GreenCTAButtonProps = {
  children: ReactNode;
  href?: string;
  icon?: LucideIcon | null;
  size?: "default" | "compact";
  className?: string;
  id?: string;
};

export default function GreenCTAButton({
  children,
  href = "#comprar",
  icon: Icon = Zap,
  size = "default",
  className = "",
  id,
}: GreenCTAButtonProps) {
  const sizeClasses =
    size === "compact"
      ? "gap-1.5 px-4 py-2.5 text-[11px] rounded-xl sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
      : "gap-2 px-6 py-3.5 text-sm rounded-2xl sm:px-8 sm:py-4 sm:text-base";

  const iconClasses =
    size === "compact" ? "h-3.5 w-3.5 sm:h-4 sm:w-4" : "h-5 w-5 sm:h-5 sm:w-5";

  return (
    <motion.a
      id={id}
      href={href}
      animate={pulseAnimation}
      transition={pulseTransition}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center justify-center whitespace-nowrap border border-emerald-300/40 bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-700 font-black uppercase text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors hover:from-emerald-300 hover:via-green-400 hover:to-emerald-600 ${sizeClasses} ${className}`}
    >
      {Icon && <Icon className={`shrink-0 fill-white text-white ${iconClasses}`} />}
      {children}
    </motion.a>
  );
}
