function CoursePlans() {
  return (
    <section id="kurser" className="max-w-[1400px] mx-auto px-6 md:px-12 py-32">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
          Priser & Planer
        </span>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
          Välj din studieplan
        </h2>
        <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
          Oavsett var du befinner dig i din förberedelse har vi rätt plan för dig. Alla planer ger dig full tillgång till vårt omfattande material.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Free Plan */}
        <div className="group bg-white rounded-3xl p-8 shadow-lg border-2 border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">Gratis</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-bold text-slate-900">0 kr</span>
              <span className="text-slate-600 font-medium">/månad</span>
            </div>
            <p className="text-slate-600 leading-relaxed">Perfekt för att komma igång och testa materialet</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">500+ övningsuppgifter</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">20 videogenomgångar</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">Grundläggande lösningar</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">Formelblad och tips</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="x" className="w-5 h-5 text-slate-300 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-400">Personlig handledning</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="x" className="w-5 h-5 text-slate-300 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-400">Detaljerade kunskapsanalyser</span>
            </li>
          </ul>

          <button className="w-full bg-slate-100 text-slate-900 py-3.5 rounded-full font-semibold hover:bg-slate-200 hover:scale-105 active:scale-95 transition-all" aria-label="Kom igång med gratis plan">
            Kom igång gratis
          </button>
        </div>

        {/* Premium Plan - Highlighted */}
        <div className="group bg-slate-900 rounded-3xl p-8 shadow-2xl border-2 border-slate-900 relative transform md:-translate-y-4 hover:scale-105 transition-all duration-300">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
            🔥 Mest populär
          </div>
          
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-white mb-2">Premium</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-bold text-white">399 kr</span>
              <span className="text-slate-300 font-medium">/månad</span>
            </div>
            <p className="text-slate-300 leading-relaxed">För dig som vill ha full tillgång och experthjälp</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white font-medium">5 000+ övningsuppgifter</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white">200+ videogenomgångar</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white">Expertförklaringar till allt</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white">Personlig handledare</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white">Detaljerade kunskapsanalyser</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white">Simulerade provtillfällen</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white font-medium">Skräddarsytt studieupplägg</span>
            </li>
          </ul>

          <button className="w-full bg-white text-slate-900 py-3.5 rounded-full font-semibold hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all shadow-md" aria-label="Välj Premium plan">
            Välj Premium →
          </button>
        </div>

        {/* Pro Plan */}
        <div className="group bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 shadow-lg border-2 border-slate-700 hover:border-slate-600 hover:shadow-2xl transition-all duration-300">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-semibold text-white">Pro</h3>
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">⚡ VIP</span>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">699 kr</span>
              <span className="text-slate-400 font-medium">/månad</span>
            </div>
            <p className="text-slate-300 leading-relaxed">Maximal support för garanterat godkänt resultat</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white font-medium">Allt i Premium</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white">1-till-1 videosessioner</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white">Obegränsad support via chatt</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white">Veckovis uppföljning</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white font-medium">Resultatgaranti</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white">Prioriterad support</span>
            </li>
          </ul>

          <button className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 py-3.5 rounded-full font-bold hover:from-amber-300 hover:to-yellow-400 hover:scale-105 active:scale-95 transition-all shadow-xl" aria-label="Välj Pro plan">
            Välj Pro →
          </button>
        </div>
      </div>

      {/* Money Back Guarantee */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 text-center border-2 border-green-100 shadow-lg hover:shadow-xl transition-shadow">
        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
          <i data-lucide="shield-check" className="w-10 h-10 text-green-600"></i>
        </div>
        <h3 className="text-3xl font-bold text-slate-900 mb-3">30 dagars pengarna-tillbaka-garanti</h3>
        <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
          Om du inte är nöjd med ditt medlemskap inom de första 30 dagarna får du pengarna tillbaka. <span className="font-semibold">Inga krångliga frågor.</span>
        </p>
      </div>
    </section>
  );
}

export default CoursePlans;
