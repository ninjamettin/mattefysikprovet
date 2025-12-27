function Hero() {
  return (
    <main className="max-w-[1400px] mx-auto px-4 mt-16 md:mt-24 flex flex-col items-center text-center perspective-container">
      <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
        <i data-lucide="check-circle" className="w-4 h-4"></i>
        10 000+ studenter har klarat provet med oss
      </div>

      <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-slate-900 mb-6 max-w-4xl leading-[1.1]">
        Besegra matematik- och <br className="hidden md:block" /> fysikprovet
      </h1>
      
      <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed font-normal">
        Allt du behöver för att klara matematik- och fysikprovet. Få tillgång till övningsuppgifter, videogenomgångar och expertförklaringar som hjälper dig nå ditt mål.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
        <button className="bg-slate-900 text-white px-8 py-3.5 rounded-full text-lg font-medium hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 min-w-[200px]">
          Kom igång gratis
        </button>
        <button className="bg-slate-200/50 backdrop-blur-sm text-slate-800 px-8 py-3.5 rounded-full text-lg font-medium hover:bg-white/60 transition-colors min-w-[200px]">
          Se kurser
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-8 md:gap-16 mb-20 max-w-3xl">
        <div>
          <div className="text-3xl md:text-4xl font-semibold text-slate-900 mb-1">10 000+</div>
          <div className="text-sm text-slate-600">Nöjda studenter</div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-semibold text-slate-900 mb-1">5 000+</div>
          <div className="text-sm text-slate-600">Övningsuppgifter</div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-semibold text-slate-900 mb-1">200+</div>
          <div className="text-sm text-slate-600">Videogenomgångar</div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
