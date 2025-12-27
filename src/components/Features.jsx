function Features() {
  return (
    <section id="funktioner" className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32 pt-10 relative">
      {/* Floating 3D Element */}
      <div className="absolute top-20 right-10 w-40 h-40 border-2 border-slate-200/40 rotate-45 animate-float pointer-events-none hidden lg:block"></div>
      
      <div className="text-center mb-20">
        <span className="inline-block px-5 py-2 bg-slate-900 text-white text-sm font-medium mb-6 tracking-wide uppercase">
          Funktioner
        </span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 animate-fade-in">
          Allt du behöver för att lyckas
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Professionella verktyg och resurser designade för ditt framgång
        </p>
      </div>

      {/* Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Founder Story Card */}
        <div className="group bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              B
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Grundarens Resa</h3>
              <p className="text-sm text-slate-600">Teknisk Fysik, KTH</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 mb-6 relative z-10 border border-slate-100">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="flex-shrink-0 w-6 h-6 text-emerald-600 mt-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Jag klarade matematik- och fysikprovet</strong> själv och kom in på Teknisk Fysik på KTH
                </p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="flex-shrink-0 w-6 h-6 text-emerald-600 mt-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Jag vet exakt</strong> vad som krävs för att lyckas
                </p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="flex-shrink-0 w-6 h-6 text-emerald-600 mt-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Min egen erfarenhet</strong> ligger till grund för varje övning och förklaring
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg text-slate-700 leading-relaxed">
            <strong className="font-bold text-slate-900">En student som förstår studenter.</strong> Jag har gått samma väg och vet precis vilka utmaningar du står inför.
          </p>
        </div>

        {/* Smart PDF Solutions Card */}
        <div className="group bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-50 rounded-full translate-y-16 -translate-x-16 opacity-50"></div>
          
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-8 relative z-10">
            Smarta lösningsförslag PDF till ALLA prov
          </h3>

          {/* PDF Mockup */}
          <div className="bg-slate-50 rounded-xl p-6 mb-6 relative z-10 border border-slate-100 group-hover:scale-[1.02] transition-transform duration-300">
            <div className="space-y-3">
              {[0, 1, 2].map((item) => (
                <div key={item} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-all cursor-pointer group/pdf hover:shadow-md">
                  <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm group-hover/pdf:scale-110 transition-transform">
                    <i data-lucide="file-text" className="w-6 h-6 text-white"></i>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900">Hösten 20{20 + item} - Lösningar</div>
                    <div className="text-sm text-slate-600">Komplett lösningsförslag</div>
                  </div>
                  <i data-lucide="download" className="w-5 h-5 text-slate-600"></i>
                </div>
              ))}
            </div>
          </div>

          <p className="text-base text-slate-600 leading-relaxed relative z-10">
            <strong className="font-semibold text-slate-900">Alla gamla prov + våra egna.</strong> Detaljerade lösningar med förklaringar så du förstår varje steg på vägen.
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
          <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-3">Automatisk rättning & extra prov</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Vårt eget <strong className="text-slate-900">automatiska rättningssystem</strong> ger dig omedelbar feedback. Plus <strong className="text-slate-900">25+ extra provkopior</strong>.
          </p>
        </div>

        {/* Only Organization Card */}
        <div className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100">
          <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
            <i data-lucide="award" className="w-7 h-7 text-white"></i>
          </div>
          <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-3">Enda organisationen i Sverige</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Vi är <strong className="text-slate-900">den enda organisationen</strong> som specialiserar sig på mattefysikprovet.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100">
          <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
            <i data-lucide="users" className="w-7 h-7 text-white"></i>
          </div>
          <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-3">Personlig handledning</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Få hjälp när du kör fast. Erfarna handledare svarar på dina frågor och guidar dig framåt.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Features;
