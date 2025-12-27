import { useState } from 'react'

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="w-full pt-6 pb-4 px-6 md:px-12 sticky top-0 z-50 bg-[#A4C4E3]/80 backdrop-blur-lg border-b border-white/20">
      <div className="flex justify-between items-center max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6">
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-slate-900 w-6 h-6">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path>
            </svg>
          </div>
          <span className="text-xl font-semibold tracking-tight text-slate-900">MaFyGuiden</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium text-slate-700">
          <a href="#funktioner" className="hover:text-slate-900 transition-colors relative group">
            Funktioner
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all group-hover:w-full"></span>
          </a>
          <a href="#omprovet" className="hover:text-slate-900 transition-colors relative group">
            Om provet
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all group-hover:w-full"></span>
          </a>
          <a href="#kurser" className="hover:text-slate-900 transition-colors relative group">
            Kurser
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all group-hover:w-full"></span>
          </a>
          <a href="#referenser" className="hover:text-slate-900 transition-colors relative group">
            Referenser
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all group-hover:w-full"></span>
          </a>
          <a href="#kontakt" className="hover:text-slate-900 transition-colors relative group">
            Kontakt
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all group-hover:w-full"></span>
          </a>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-slate-700 px-4 py-2 text-base font-medium hover:text-slate-900 transition-colors" aria-label="Logga in">
            Logga in
          </button>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-base font-medium hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-slate-900/20" aria-label="Bli medlem gratis">
            Bli medlem gratis
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-900"
          aria-label="Öppna meny"
          aria-expanded={mobileMenuOpen}
        >
          <i data-lucide={mobileMenuOpen ? "x" : "menu"} className="w-6 h-6"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col gap-3 bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <a href="#funktioner" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-slate-900 py-2 font-medium transition-colors">
              Funktioner
            </a>
            <a href="#omprovet" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-slate-900 py-2 font-medium transition-colors">
              Om provet
            </a>
            <a href="#kurser" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-slate-900 py-2 font-medium transition-colors">
              Kurser
            </a>
            <a href="#referenser" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-slate-900 py-2 font-medium transition-colors">
              Referenser
            </a>
            <a href="#kontakt" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-slate-900 py-2 font-medium transition-colors">
              Kontakt
            </a>
            <div className="border-t border-slate-200 pt-3 mt-2 flex flex-col gap-2">
              <button className="text-slate-700 px-4 py-2 text-base font-medium hover:text-slate-900 transition-colors text-left">
                Logga in
              </button>
              <button className="bg-slate-900 text-white px-6 py-3 rounded-full text-base font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                Bli medlem gratis
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
