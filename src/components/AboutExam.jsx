function AboutExam() {
  return (
    <section id="omprovet" className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
          Om matematik- och fysikprovet
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Matematik- och fysikprovet är ett centralt prov som ger behörighet till tekniska högskole- och civilingenjörsprogram. Här är allt du behöver veta.
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <i data-lucide="calendar" className="w-6 h-6 text-blue-600"></i>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">När genomförs provet?</h3>
          <p className="text-slate-600 leading-relaxed">
            Provet genomförs två gånger per år, en gång på våren och en gång på hösten. Anmälan sker via Antagning.se.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
            <i data-lucide="book-open" className="w-6 h-6 text-green-600"></i>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Vad testar provet?</h3>
          <p className="text-slate-600 leading-relaxed">
            Provet täcker matematik (alg​ebra, geometri, funktioner) och fysik (mekanik, elektricitet, våglära). Totalt 4 timmar.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
            <i data-lucide="target" className="w-6 h-6 text-purple-600"></i>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Vilka poäng krävs?</h3>
          <p className="text-slate-600 leading-relaxed">
            För att nå behörighet krävs minst 60% rätt på matematikdelen och 50% rätt på fysikdelen. Vi hjälper dig nå dit!
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
            <i data-lucide="clock" className="w-6 h-6 text-orange-600"></i>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Hur lång tid behövs?</h3>
          <p className="text-slate-600 leading-relaxed">
            Med rätt material och struktur kan de flesta studenter förbereda sig på 2-4 månader med ca 1-2 timmar per dag.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
            <i data-lucide="file-check" className="w-6 h-6 text-red-600"></i>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Vilka hjälpmedel?</h3>
          <p className="text-slate-600 leading-relaxed">
            Godkänd miniräknare är tillåten. Formelblad tillhandahålls. Inga andra hjälpmedel är tillåtna under provet.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
            <i data-lucide="graduation-cap" className="w-6 h-6 text-teal-600"></i>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Varför är det viktigt?</h3>
          <p className="text-slate-600 leading-relaxed">
            Provet ger behörighet till tekniska program och öppnar dörrar till drömutbildningar inom teknik och naturvetenskap.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-center text-white">
        <h3 className="text-3xl font-semibold mb-4">Redo att börja din resa?</h3>
        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
          Få tillgång till alla övningsuppgifter, videogenomgångar och expertförklaringar du behöver för att klara provet.
        </p>
        <button className="bg-white text-slate-900 px-8 py-3.5 rounded-full text-lg font-medium hover:bg-slate-100 transition-colors shadow-lg">
          Kom igång nu
        </button>
      </div>
    </section>
  );
}

export default AboutExam;
