import { useState } from 'react'
import logo from '../assets/logo.png'

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="w-full py-4 px-6 md:px-8 lg:px-12 sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="flex justify-between items-center max-w-[1440px] mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-sm ring-1 ring-gray-200/50 group-hover:ring-gray-300/50 transition-all">
            <img 
              src={logo} 
              alt="MaFyProvet Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
            MaFyProvet
          </span>
        </div>

        {/* Desktop Menu - Center */}
        <div className="hidden lg:flex items-center gap-1">
          <a 
            href="#vad-ar-det" 
            className="px-4 py-2 text-[15px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
          >
            Vad är det här?
          </a>
          <a 
            href="#om-grundaren" 
            className="px-4 py-2 text-[15px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
          >
            Om grundaren
          </a>
        </div>

        {/* Desktop CTAs - Right */}
        <div className="hidden md:flex items-center gap-3">
          <button 
            className="px-5 py-2.5 text-[15px] font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all" 
            aria-label="Logga in"
          >
            Logga in
          </button>
          <button 
            className="px-6 py-2.5 text-[15px] font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0" 
            aria-label="Testa gratis utan inlogg"
          >
            Testa gratis utan inlogg
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
          aria-label="Öppna meny"
          aria-expanded={mobileMenuOpen}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-2 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col gap-2 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
            <a 
              href="#vad-ar-det" 
              onClick={() => setMobileMenuOpen(false)} 
              className="px-4 py-3 text-[15px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
            >
              Vad är det här?
            </a>
            <a 
              href="#om-grundaren" 
              onClick={() => setMobileMenuOpen(false)} 
              className="px-4 py-3 text-[15px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
            >
              Om grundaren
            </a>
            <div className="border-t border-gray-100 pt-3 mt-2 flex flex-col gap-2">
              <button className="px-4 py-3 text-[15px] font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all text-left">
                Logga in
              </button>
              <button className="px-6 py-3 text-[15px] font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg transition-all shadow-md">
                Testa gratis utan inlogg
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
