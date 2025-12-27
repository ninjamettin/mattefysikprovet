function Features() {
  return (
    <section id="funktioner" className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32 pt-10">
      <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 text-center mb-16">
        Allt du behöver för att lyckas
      </h2>

      {/* Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        {/* Interactive Learning Card */}
        <div className="bg-[#EFEDE8] rounded-[2rem] p-8 md:p-10 flex flex-col">
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900 mb-8 max-w-sm">
            Interaktivt lärande som håller dig engagerad
          </h3>

          {/* UI Mockup */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-12 flex-1 flex flex-col justify-center">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700">Din framgång</span>
                <span className="text-sm font-semibold text-green-600">67%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" style={{width: '67%'}}></div>
              </div>
            </div>

            {/* Subject Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <i data-lucide="function-square" className="w-5 h-5 text-blue-600"></i>
                  <span className="font-semibold text-slate-900">Matematik</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">75%</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <i data-lucide="zap" className="w-5 h-5 text-purple-600"></i>
                  <span className="font-semibold text-slate-900">Fysik</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">59%</div>
              </div>
            </div>
          </div>

          <p className="text-lg text-slate-600 leading-relaxed">
            <strong className="font-semibold text-slate-900">Följ din utveckling i realtid.</strong> Se exakt var du är stark och var du behöver öva mer. Vår smarta analys ger dig personliga rekommendationer.
          </p>
        </div>

        {/* Video Library Card */}
        <div className="bg-[#EFEDE8] rounded-[2rem] p-8 md:p-10 flex flex-col">
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900 mb-8 max-w-sm">
            200+ videogenomgångar av erfarna lärare
          </h3>

          {/* Video Grid Mockup */}
          <div className="grid grid-cols-2 gap-4 mb-12 opacity-90">
            {/* Video thumbnails */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="aspect-video bg-white rounded-xl shadow-sm flex items-center justify-center relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <i data-lucide="play" className="w-5 h-5 text-slate-900 fill-current ml-1"></i>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-xs px-2 py-1 rounded">
                  {[12, 8, 15, 10][item - 1]} min
                </div>
              </div>
            ))}
          </div>

          <p className="text-lg text-slate-600 leading-relaxed mt-auto">
            <strong className="font-semibold text-slate-900">Lär dig i din egen takt.</strong> Varje koncept förklaras steg-för-steg med tydliga exempel. Pausa, spola tillbaka och repetera tills du behärskar det.
          </p>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="bg-[#EFEDE8] rounded-[2rem] p-8 flex flex-col items-start">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
            <i data-lucide="brain" className="w-5 h-5 text-slate-800"></i>
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-900 mb-4">5 000+ övningsuppgifter</h3>
          <p className="text-base text-slate-600 leading-relaxed">
            Öva på riktiga provuppgifter med detaljerade lösningar. Från grundläggande till avancerade problem.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#EFEDE8] rounded-[2rem] p-8 flex flex-col items-start">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
            <i data-lucide="target" className="w-5 h-5 text-slate-800"></i>
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-900 mb-4">Simulerade prov</h3>
          <p className="text-base text-slate-600 leading-relaxed">
            Testa dina kunskaper under verkliga provförhållanden. Få detaljerad återkoppling på varje område.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#EFEDE8] rounded-[2rem] p-8 flex flex-col items-start">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
            <i data-lucide="users" className="w-5 h-5 text-slate-800"></i>
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-900 mb-4">Personlig handledning</h3>
          <p className="text-base text-slate-600 leading-relaxed">
            Få hjälp när du kör fast. Våra erfarna handledare svarar på dina frågor och guidar dig framåt.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Features;
