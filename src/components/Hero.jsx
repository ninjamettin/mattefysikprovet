import { useState } from 'react'

function Hero() {
  const [loading, setLoading] = useState(false)

  const handleGetStarted = () => {
    setLoading(true)
    // Simulate navigation/action
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <main className="max-w-[1400px] mx-auto px-4 mt-16 md:mt-24 flex flex-col items-center text-center perspective-container">
      {/* Trust Badge - animated entrance */}
      <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-in fade-in slide-in-from-top-3 duration-500 border border-green-200/50">
        <i data-lucide="check-circle" className="w-4 h-4"></i>
        10 000+ studenter har klarat provet med oss
      </div>

      {/* Main Headline - improved typography */}
      <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-slate-900 mb-6 max-w-4xl leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700">
        Besegra matematik- och <br className="hidden md:block" /> fysikprovet
      </h1>
      
      {/* Subheadline - better contrast */}
      <p className="text-lg md:text-xl text-slate-700 max-w-2xl mb-10 leading-relaxed font-normal animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
        Allt du behöver för att klara matematik- och fysikprovet. Få tillgång till övningsuppgifter, videogenomgångar och expertförklaringar som hjälper dig nå ditt mål.
      </p>

      {/* Enhanced CTAs with clear hierarchy */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
        <button 
          onClick={handleGetStarted}
          disabled={loading}
          className="group bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-slate-900/30 hover:shadow-slate-900/40 min-w-[220px] relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
          aria-label="Kom igång gratis"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Laddar...
            </span>
          ) : (
            <>
              Kom igång gratis
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
            </>
          )}
        </button>
        <button className="bg-white/90 backdrop-blur-sm text-slate-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:scale-105 active:scale-95 transition-all min-w-[220px] border-2 border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl" aria-label="Se kurser">
          Se kurser
        </button>
      </div>

      {/* Stats with better visual separation */}
      <div className="grid grid-cols-3 gap-8 md:gap-16 mb-20 max-w-3xl animate-in fade-in zoom-in-95 duration-700 delay-300">
        <div className="group">
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">10 000+</div>
          <div className="text-sm md:text-base text-slate-600 font-medium">Nöjda studenter</div>
        </div>
        <div className="group border-x border-slate-300/50 px-4">
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">5 000+</div>
          <div className="text-sm md:text-base text-slate-600 font-medium">Övningsuppgifter</div>
        </div>
        <div className="group">
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">200+</div>
          <div className="text-sm md:text-base text-slate-600 font-medium">Videogenomgångar</div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="flex flex-wrap items-center justify-center gap-8 mb-12 opacity-60 animate-in fade-in duration-700 delay-500">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <i data-lucide="shield-check" className="w-4 h-4"></i>
          <span>100% säkert</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <i data-lucide="clock" className="w-4 h-4"></i>
          <span>Tillgängligt 24/7</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <i data-lucide="award" className="w-4 h-4"></i>
          <span>Certifierade handledare</span>
        </div>
      </div>
    </main>
  );
}

export default Hero;
