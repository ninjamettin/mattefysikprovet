function CoursePlans() {
  return (
    <section id="kurser" className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
          Välj din studieplan
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Oavsett var du befinner dig i din förberedelse har vi rätt plan för dig. Alla planer ger dig full tillgång till vårt omfattande material.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Free Plan */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-slate-200 hover:border-slate-300 transition-colors">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">Gratis</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold text-slate-900">0 kr</span>
              <span className="text-slate-600">/månad</span>
            </div>
            <p className="text-slate-600">Perfekt för att komma igång och testa materialet</p>
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

          <button className="w-full bg-slate-100 text-slate-900 py-3 rounded-full font-medium hover:bg-slate-200 transition-colors">
            Kom igång gratis
          </button>
        </div>

        {/* Premium Plan - Highlighted */}
        <div className="bg-slate-900 rounded-2xl p-8 shadow-xl border-2 border-slate-900 relative transform md:-translate-y-4">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Mest populär
          </div>
          
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-white mb-2">Premium</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold text-white">399 kr</span>
              <span className="text-slate-300">/månad</span>
            </div>
            <p className="text-slate-300">För dig som vill ha full tillgång och experthjälp</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"></i>
              <span className="text-white">5 000+ övningsuppgifter</span>
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
              <span className="text-white">Skräddarsytt studieupplägg</span>
            </li>
          </ul>

          <button className="w-full bg-white text-slate-900 py-3 rounded-full font-medium hover:bg-slate-100 transition-colors">
            Välj Premium
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-slate-200 hover:border-slate-300 transition-colors">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">Pro</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold text-slate-900">699 kr</span>
              <span className="text-slate-600">/månad</span>
            </div>
            <p className="text-slate-600">Maximal support för garanterat godkänt resultat</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">Allt i Premium</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">1-till-1 videosessioner</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">Obegränsad support via chatt</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">Veckovis uppföljning</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">Resultatgaranti</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">Prioriterad support</span>
            </li>
          </ul>

          <button className="w-full bg-slate-900 text-white py-3 rounded-full font-medium hover:bg-slate-800 transition-colors">
            Välj Pro
          </button>
        </div>
      </div>

      {/* Money Back Guarantee */}
      <div className="bg-green-50 rounded-2xl p-8 text-center border border-green-100">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i data-lucide="shield-check" className="w-8 h-8 text-green-600"></i>
        </div>
        <h3 className="text-2xl font-semibold text-slate-900 mb-2">30 dagars pengarna-tillbaka-garanti</h3>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Om du inte är nöjd med ditt medlemskap inom de första 30 dagarna får du pengarna tillbaka. Inga krångliga frågor.
        </p>
      </div>
    </section>
  );
}

export default CoursePlans;
