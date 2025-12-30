function Features() {
  return (
    <section id="funktioner" className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32 pt-20 relative">

      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 animate-fade-in">
          Du kan lyckas utan bra betyg i SO-ämnen.
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Professionella verktyg och resurser designade för ditt framgång
        </p>
      </div>

      {/* Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Solution PDFs and Videos Card */}
        <div className="group bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-50 rounded-full translate-y-16 -translate-x-16 opacity-50"></div>
          
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-16 h-16 bg-blue-400 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
              <i data-lucide="graduation-cap" className="w-8 h-8"></i>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Lösningar till ALLA prov
            </h3>
          </div>

          {/* Solution Resources Display */}
          <div className="bg-slate-50 rounded-xl p-6 mb-6 relative z-10 border border-slate-100">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i data-lucide="file-text" className="w-5 h-5" style={{ color: 'white', stroke: 'white' }}></i>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 mb-1">Lösnings-PDFer</div>
                  <div className="text-sm text-slate-600">Detaljerade skriftliga lösningar med steg-för-steg förklaringar</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i data-lucide="video" className="w-5 h-5" style={{ color: 'white', stroke: 'white' }}></i>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 mb-1">Video-genomgångar</div>
                  <div className="text-sm text-slate-600">Videor där varje uppgift förklaras tydligt från början till slut</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i data-lucide="check-circle" className="w-5 h-5" style={{ color: 'white', stroke: 'white' }}></i>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 mb-1">Fullständig täckning</div>
                  <div className="text-sm text-slate-600">Lösningar till ALLA gamla mattefysikprov - inget utelämnat</div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-base text-slate-600 leading-relaxed relative z-10">
            <strong className="font-semibold text-slate-900">Skapat av tekniska fysiker från KTH</strong> som själva klarade provet. Vi vet exakt vad som krävs och delar med oss av alla våra insikter.
          </p>
        </div>

        {/* Custom Exams Card */}
        <div className="group bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-16 h-16 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
              <i data-lucide="file-plus" className="w-8 h-8"></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">25+ Egna Prov</h3>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 mb-6 relative z-10 border border-slate-100">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="flex-shrink-0 w-6 h-6 text-emerald-600 mt-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Vi har skapat 25+ egna prov</strong> som är lika svåra som de riktiga proven
                </p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="flex-shrink-0 w-6 h-6 text-emerald-600 mt-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Slut på gamla prov?</strong> Inga problem - du har massor av nytt material
                </p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="flex-shrink-0 w-6 h-6 text-emerald-600 mt-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Aldrig osäker</strong> på vad du ska plugga på härnäst
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg text-slate-700 leading-relaxed">
            <strong className="font-bold text-slate-900">Du kan alltid fortsätta knoga!</strong> Med våra egna prov behöver du aldrig oroa dig för att övningsmaterialet tar slut.
          </p>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Auto-Correcting System Card */}
        <div className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100">
          <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
            <i data-lucide="cpu" className="w-7 h-7 text-white"></i>
          </div>
          <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-3">Automatisk Rättning</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Vårt eget <strong className="text-slate-900">automatiska rättningssystem</strong> ger dig omedelbar feedback. Du kan följa statistiken över vilka typer av uppgifter du oftast gör fel på. På så sätt vet du exakt vad du behöver fokusera på. Då ökar du dina chanser att lyckas och dominera nästa prov!
          </p>
        </div>

        {/* Only Organization Card */}
        <div className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100">
          <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
            <i data-lucide="award" className="w-7 h-7 text-white"></i>
          </div>
          <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-3">Enda organisationen i Sverige</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-900">Vi är den enda organisationen i Sverige</strong> som erbjuder en guide för studenter som vill förbereda sig inför mattefysikprovet. Det finns tiotals hemsidor och resurser för att plugga till högskoleprovet, där konkurrensen är hård och utbudet stort. Däremot finns det absolut ingen som fokuserar på mattefysikprovet, trots att det kan vara en direkt väg in till Sveriges topputbildningar.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100">
          <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
            <i data-lucide="users" className="w-7 h-7 text-white"></i>
          </div>
          <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-3">Personlig handledning</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Få hjälp på direkten när du kör fast och behöver vägledning.<strong className="text-slate-900"> Våra erfarna handledare har själva skrivit mattefysikprovet och kommit in på sina drömutbildningar.</strong> De vet exakt vad som krävs för att lyckas och delar med sig av strategier, insikter och tips som verkligen fungerar. Nu vill de hjälpa nästa generation studenter att nå samma mål.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Features;
