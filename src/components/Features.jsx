function Features() {
  return (
    <section id="funktioner" className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32 pt-10">
      <div className="text-center mb-20">
        <span className="inline-block px-4 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4 animate-slide-in-from-top-3">
          Funktioner
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 animate-fade-in">
          Allt du behöver för att lyckas
        </h2>
        <p className="text-lg text-slate-700 max-w-2xl mx-auto">
          Smarta verktyg och omfattande resurser designade för att maximera dina resultat
        </p>
      </div>

      {/* Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Interactive Learning Card */}
        <div className="group bg-gradient-to-br from-[#EFEDE8] to-[#E5E3DE] rounded-[2rem] p-8 md:p-10 flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-10 max-w-sm">
            Interaktivt lärande som håller dig engagerad
          </h3>

          {/* UI Mockup */}
          <div className="bg-white rounded-2xl p-7 shadow-xl mb-12 flex-1 flex flex-col justify-center border border-slate-100 group-hover:scale-105 transition-transform">
            {/* Progress Bar */}
            <div className="mb-7">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-slate-700">Din framgång</span>
                <span className="text-sm font-bold text-green-600">67%</span>
              </div>
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-1000" style={{width: '67%'}}></div>
              </div>
            </div>

            {/* Subject Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border-2 border-blue-200 hover:border-blue-300 transition-colors shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <i data-lucide="function-square" className="w-6 h-6 text-blue-600"></i>
                  <span className="font-bold text-slate-900">Matematik</span>
                </div>
                <div className="text-3xl font-bold text-blue-600">75%</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border-2 border-purple-200 hover:border-purple-300 transition-colors shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <i data-lucide="zap" className="w-6 h-6 text-purple-600"></i>
                  <span className="font-bold text-slate-900">Fysik</span>
                </div>
                <div className="text-3xl font-bold text-purple-600">59%</div>
              </div>
            </div>
          </div>

          <p className="text-lg text-slate-700 leading-relaxed">
            <strong className="font-bold text-slate-900">Följ din utveckling i realtid.</strong> Se exakt var du är stark och var du behöver öva mer. Vår smarta analys ger dig personliga rekommendationer.
          </p>
        </div>

        {/* Video Library Card */}
        <div className="group bg-gradient-to-br from-[#EFEDE8] to-[#E5E3DE] rounded-[2rem] p-8 md:p-10 flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-10 max-w-sm">
            200+ videogenomgångar av erfarna lärare
          </h3>

          {/* Video Grid Mockup */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            {/* Video thumbnails */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="aspect-video bg-white rounded-xl shadow-md flex items-center justify-center relative overflow-hidden group/video cursor-pointer hover:scale-105 hover:shadow-xl transition-all border border-slate-100">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover/video:scale-125 transition-transform">
                    <i data-lucide="play" className="w-6 h-6 text-slate-900 fill-current ml-1"></i>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 bg-slate-900/90 text-white text-xs font-semibold px-2.5 py-1.5 rounded-md shadow-lg">
                  {[12, 8, 15, 10][item - 1]} min
                </div>
              </div>
            ))}
          </div>

          <p className="text-lg text-slate-700 leading-relaxed mt-auto">
            <strong className="font-bold text-slate-900">Lär dig i din egen takt.</strong> Varje koncept förklaras steg-för-steg med tydliga exempel. Pausa, spola tillbaka och repetera tills du behärskar det.
          </p>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <div className="group bg-gradient-to-br from-[#EFEDE8] to-[#E5E3DE] rounded-[2rem] p-9 flex flex-col items-start shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-white to-slate-50 rounded-2xl flex items-center justify-center mb-7 shadow-md group-hover:scale-110 transition-transform">
            <i data-lucide="brain" className="w-8 h-8 text-slate-800"></i>
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 mb-4">5 000+ övningsuppgifter</h3>
          <p className="text-base text-slate-700 leading-relaxed">
            Öva på riktiga provuppgifter med detaljerade lösningar. Från grundläggande till avancerade problem.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group bg-gradient-to-br from-[#EFEDE8] to-[#E5E3DE] rounded-[2rem] p-9 flex flex-col items-start shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-white to-slate-50 rounded-2xl flex items-center justify-center mb-7 shadow-md group-hover:scale-110 transition-transform">
            <i data-lucide="target" className="w-8 h-8 text-slate-800"></i>
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 mb-4">Simulerade prov</h3>
          <p className="text-base text-slate-700 leading-relaxed">
            Testa dina kunskaper under verkliga provförhållanden. Få detaljerad återkoppling på varje område.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group bg-gradient-to-br from-[#EFEDE8] to-[#E5E3DE] rounded-[2rem] p-9 flex flex-col items-start shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-white to-slate-50 rounded-2xl flex items-center justify-center mb-7 shadow-md group-hover:scale-110 transition-transform">
            <i data-lucide="users" className="w-8 h-8 text-slate-800"></i>
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 mb-4">Personlig handledning</h3>
          <p className="text-base text-slate-700 leading-relaxed">
            Få hjälp när du kör fast. Våra erfarna handledare svarar på dina frågor och guidar dig framåt.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Features;
