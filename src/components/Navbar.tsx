import { useEffect, useState } from "react";
import GreenCTAButton from "./GreenCTAButton";

const DESKTOP_MQ = "(min-width: 768px)";

export default function Navbar() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia(DESKTOP_MQ).matches
  );
  const [mobileSticky, setMobileSticky] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let retryId = 0;
    let cancelled = false;
    const mq = window.matchMedia(DESKTOP_MQ);

    const attach = () => {
      if (cancelled || mq.matches) return true;

      const trigger = document.getElementById("nav-sticky-trigger");
      if (!trigger) return false;

      if (trigger.getBoundingClientRect().bottom <= 0) {
        setMobileSticky(true);
        return true;
      }

      observer?.disconnect();
      observer = new IntersectionObserver(
        ([entry]) => {
          if (mq.matches) return;
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            setMobileSticky(true);
            observer?.disconnect();
            observer = null;
          }
        },
        { threshold: 0 }
      );
      observer.observe(trigger);
      return true;
    };

    const onViewportChange = () => {
      const desktop = mq.matches;
      setIsDesktop(desktop);

      if (desktop) {
        observer?.disconnect();
        observer = null;
        window.clearInterval(retryId);
        return;
      }

      if (!attach()) {
        window.clearInterval(retryId);
        retryId = window.setInterval(() => {
          if (attach()) window.clearInterval(retryId);
        }, 250);
      }
    };

    onViewportChange();
    mq.addEventListener("change", onViewportChange);

    return () => {
      cancelled = true;
      window.clearInterval(retryId);
      mq.removeEventListener("change", onViewportChange);
      observer?.disconnect();
    };
  }, []);

  const sticky = isDesktop || mobileSticky;
  const playEnterAnimation = mobileSticky && !isDesktop;

  return (
    <>
      {sticky && <div className="h-20 w-full shrink-0" aria-hidden />}
      <nav
        id="navbar"
        className={`z-50 border-b border-white/10 bg-[#1a1a1a]/90 backdrop-blur-xl ${
          sticky ? "fixed top-0 left-0 right-0" : "relative"
        } ${playEnterAnimation ? "animate-nav-sticky-in" : ""}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-2 sm:gap-3">
            <div className="flex min-w-0 flex-1 items-center">
              <span className="min-w-0 text-[10px] font-black uppercase leading-tight tracking-wide text-white sm:text-xs md:hidden">
                <span className="text-orange-400">50% OFF</span> + ACTUALIZACIONES
              </span>
              <span className="hidden min-w-0 text-base font-black uppercase leading-tight tracking-wide text-white md:inline lg:text-lg">
                <span className="text-orange-400">50% OFF</span> + FUTURAS ACTUALIZACIONES{" "}
                <span className="text-orange-400">GRATIS</span>
              </span>
            </div>

            <div className="hidden items-center gap-8 md:flex">
              <a href="#mockups" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">
                CONTENIDO
              </a>
              <a href="#temas" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">
                65 TEMAS
              </a>
              <a href="#beneficios" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">
                BENEFICIOS
              </a>
              <a href="#faq" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">
                FAQ
              </a>
              <GreenCTAButton size="compact">QUIERO ACCESO</GreenCTAButton>
            </div>

            <GreenCTAButton size="compact" className="shrink-0 md:hidden">
              QUIERO ACCESO
            </GreenCTAButton>
          </div>
        </div>
      </nav>
    </>
  );
}
