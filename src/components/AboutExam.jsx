function AboutExam() {
  return (
    <section id="omprovet" className="max-w-[1400px] mx-auto px-6 md:px-12 py-32">
      <div className="text-center mb-20">
        <span className="inline-block px-4 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium mb-4 animate-slide-in-from-top-3">
          Om Provet
        </span>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6 animate-fade-in">
          Om matematik- och fysikprovet
        </h2>
        <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
          Matematik- och fysikprovet är ett centralt prov som ger behörighet till tekniska högskole- och civilingenjörsprogram. Här är allt du behöver veta.
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="group bg-white rounded-3xl p-8 shadow-md border border-slate-100 hover:shadow-2xl hover:border-blue-200 hover:-translate-y-2 transition-all duration-300">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <i data-lucide="calendar" className="w-7 h-7 text-blue-600"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">När genomförs provet?</h3>
          <p className="text-slate-600 leading-relaxed">
            Provet genomförs två gånger per år, en gång på våren och en gång på hösten. Anmälan sker via Antagning.se.
          </p>
        </div>

        <div className="group bg-white rounded-3xl p-8 shadow-md border border-slate-100 hover:shadow-2xl hover:border-green-200 hover:-translate-y-2 transition-all duration-300">
          <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <i data-lucide="book-open" className="w-7 h-7 text-green-600"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Vad testar provet?</h3>
          <p className="text-slate-600 leading-relaxed">
            Provet täcker matematik (alg​ebra, geometri, funktioner) och fysik (mekanik, elektricitet, våglära). Totalt 4 timmar.
          </p>
        </div>

        <div className="group bg-white rounded-3xl p-8 shadow-md border border-slate-100 hover:shadow-2xl hover:border-purple-200 hover:-translate-y-2 transition-all duration-300">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <i data-lucide="target" className="w-7 h-7 text-purple-600"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Vilka poäng krävs?</h3>
          <p className="text-slate-600 leading-relaxed">
            För att nå behörighet krävs minst 60% rätt på matematikdelen och 50% rätt på fysikdelen. Vi hjälper dig nå dit!
          </p>
        </div>

        <div className="group bg-white rounded-3xl p-8 shadow-md border border-slate-100 hover:shadow-2xl hover:border-orange-200 hover:-translate-y-2 transition-all duration-300">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <i data-lucide="clock" className="w-7 h-7 text-orange-600"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Hur lång tid behövs?</h3>
          <p className="text-slate-600 leading-relaxed">
            Med rätt material och struktur kan de flesta studenter förbereda sig på 2-4 månader med ca 1-2 timmar per dag.
          </p>
        </div>

        <div className="group bg-white rounded-3xl p-8 shadow-md border border-slate-100 hover:shadow-2xl hover:border-red-200 hover:-translate-y-2 transition-all duration-300">
          <div className="w-14 h-14 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <i data-lucide="file-check" className="w-7 h-7 text-red-600"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Vilka hjälpmedel?</h3>
          <p className="text-slate-600 leading-relaxed">
            Godkänd miniräknare är tillåten. Formelblad tillhandahålls. Inga andra hjälpmedel är tillåtna under provet.
          </p>
        </div>

        <div className="group bg-white rounded-3xl p-8 shadow-md border border-slate-100 hover:shadow-2xl hover:border-teal-200 hover:-translate-y-2 transition-all duration-300">
          <div className="w-14 h-14 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <i data-lucide="graduation-cap" className="w-7 h-7 text-teal-600"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Varför är det viktigt?</h3>
          <p className="text-slate-600 leading-relaxed">
            Provet ger behörighet till tekniska program och öppnar dörrar till drömutbildningar inom teknik och naturvetenskap.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full translate-y-32 -translate-x-32 blur-3xl"></div>
        
        <div className="relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Redo att börja din resa?</h3>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Få tillgång till alla övningsuppgifter, videogenomgångar och expertförklaringar du behöver för att klara provet.
          </p>
          <button className="bg-white text-slate-900 px-10 py-4 rounded-full text-lg font-bold hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all shadow-2xl" aria-label="Kom igång med kursen">
            Kom igång nu →
          </button>
        </div>
      </div>
    </section>
  );
}

export default AboutExam;
