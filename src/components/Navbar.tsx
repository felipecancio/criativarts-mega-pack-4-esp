import GreenCTAButton from "./GreenCTAButton";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10" id="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-2 sm:gap-3">
          <div className="flex min-w-0 flex-1 items-center">
            <span className="min-w-0 text-[10px] font-black uppercase leading-tight tracking-wide text-white sm:text-xs md:text-base lg:text-lg">
              Futuras actualizaciones <span className="text-orange-400">GRATIS</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#mockups" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              CONTENIDO
            </a>
            <a href="#temas" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              65 TEMAS
            </a>
            <a href="#beneficios" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              BENEFICIOS
            </a>
            <a href="#faq" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              FAQ
            </a>
            <GreenCTAButton size="compact">QUIERO ACCESO</GreenCTAButton>
          </div>

          <GreenCTAButton size="compact" className="md:hidden shrink-0">
            QUIERO ACCESO
          </GreenCTAButton>
        </div>
      </div>
    </nav>
  );
}
