function CoursePlans() {
  return (
    <section id="kurser" className="max-w-[1400px] mx-auto px-6 md:px-12 py-32 relative">
      {/* Floating 3D Element */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-slate-100 rounded-full blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      
      <div className="text-center mb-16">
        <span className="inline-block px-5 py-2 bg-slate-900 text-white text-sm font-medium mb-6 tracking-wide uppercase">
          Priser & Planer
        </span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
          Välj din studieplan
        </h2>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto" style={{perspective: '2000px'}}>
        {/* Free Plan */}
        <div className="group bg-white rounded-2xl p-10 shadow-lg border border-slate-200 hover:shadow-2xl transition-all duration-500 md:[transform:rotateY(8deg)] hover:[transform:rotateY(0deg)]">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Gratis</h3>
            <p className="text-slate-600 leading-relaxed">Perfekt för att komma igång</p>
          </div>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">500+ övningsuppgifter</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">20 videogenomgångar</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">Grundläggande lösningar</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">Formelblad och tips</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="x" className="w-5 h-5 text-slate-300 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-400">Personlig handledning</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="x" className="w-5 h-5 text-slate-300 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-400">Detaljerade analyser</span>
            </li>
          </ul>

          <button className="w-full bg-slate-100 text-slate-900 py-3.5 font-semibold hover:bg-slate-200 transition-all" aria-label="Kom igång gratis">
            Kom igång gratis
          </button>
        </div>

        {/* Premium Plan */}
        <div className="group bg-slate-900 rounded-2xl p-10 shadow-2xl relative overflow-hidden hover:shadow-emerald-500/10 transition-all duration-500 md:[transform:rotateY(-8deg)] hover:[transform:rotateY(0deg)]">
          

          
          <div className="mb-8 relative z-10">
            <h3 className="text-3xl font-bold text-white mb-4">Premium</h3>
            <p className="text-slate-300 leading-relaxed">Full tillgång och experthjälp</p>
          </div>

          <ul className="space-y-3 mb-8 relative z-10">
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white font-medium">5 000+ övningsuppgifter</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white">200+ videogenomgångar</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white">Expertförklaringar</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white">Personlig handledare</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white">Detaljerade analyser</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white">Simulerade prov</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white font-medium">Skräddarsytt upplägg</span>
            </li>
          </ul>

          <button className="w-full bg-white text-slate-900 py-3.5 font-semibold hover:bg-slate-50 transition-all relative z-10" aria-label="Välj Premium">\n            Välj Premium →
          </button>
        </div>
      </div>

      

      {/* Intresseanmälan Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 md:p-16 text-white shadow-2xl">
        {/* Decorative gradients */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full translate-x-48 translate-y-48 blur-3xl"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-block p-3 bg-white/10 rounded-2xl mb-6">
            <i data-lucide="user-check" className="w-12 h-12"></i>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Intresseanmälan</h3>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Är du intresserad av att få personlig kontakt med grundaren själv?
          </p>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed">
            <strong className="text-white">Grundaren kommer personligen att kontakta dig</strong> för att diskutera din studiesituation och hur vi bäst kan hjälpa dig att klara matematik- och fysikprovet.
          </p>
          
          {/* Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-6 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input 
                type="text" 
                placeholder="Ditt namn" 
                className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-4 text-white placeholder:text-slate-300 focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all"
              />
              <input 
                type="email" 
                placeholder="Din e-postadress" 
                className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-4 text-white placeholder:text-slate-300 focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all"
              />
            </div>
            <input 
              type="tel" 
              placeholder="Ditt telefonnummer" 
              className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-4 text-white placeholder:text-slate-300 focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all mb-4"
            />
            <textarea 
              placeholder="Berätta kort om din studiesituation och dina mål..." 
              rows="4"
              className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-4 text-white placeholder:text-slate-300 focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all resize-none"
            ></textarea>
          </div>
          
          <button className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:from-emerald-600 hover:to-green-600 hover:scale-105 active:scale-95 transition-all shadow-2xl" aria-label="Skicka intresseanmälan">
            Skicka intresseanmälan →
          </button>
          
          <p className="text-sm text-slate-400 mt-6">
            Vi respekterar din integritet. Dina uppgifter kommer endast användas för att kontakta dig angående ditt intresse.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CoursePlans;
