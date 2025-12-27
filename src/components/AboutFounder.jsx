function AboutFounder() {
  return (
    <section id="om-grundaren" className="max-w-[1400px] mx-auto px-6 md:px-12 py-32 pt-32 md:pt-40">
      <div className="text-center mb-20">
        <span className="inline-block px-4 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4 animate-slide-in-from-top-3">
          Grundaren
        </span>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6 animate-fade-in">
          Om grundaren
        </h2>
        <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
          Lär känna personen bakom MaFyProvet och upptäck varför denna plattform är annorlunda.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left Column - Profile */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full translate-y-32 -translate-x-32 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-5xl shadow-2xl mb-6 mx-auto">
              B
            </div>
            <h3 className="text-3xl font-bold mb-2 text-center">Burak Gündoğdu</h3>
            <p className="text-lg text-slate-300 mb-8 text-center">Grundare & Teknisk Fysiker, KTH</p>
            
            <div className="space-y-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i data-lucide="graduation-cap" className="w-5 h-5 text-blue-300"></i>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Utbildning</h4>
                  <p className="text-slate-300 text-sm">Teknisk Fysik, KTH</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i data-lucide="award" className="w-5 h-5 text-green-300"></i>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Erfarenhet</h4>
                  <p className="text-slate-300 text-sm">Klarade matematik- och fysikprovet</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i data-lucide="users" className="w-5 h-5 text-purple-300"></i>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Hjälpt studenter</h4>
                  <p className="text-slate-300 text-sm">10 000+ studenter sedan start</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Story */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                <i data-lucide="target" className="w-6 h-6 text-blue-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Min resa</h3>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              Jag klarade matematik- och fysikprovet själv och kom in på Teknisk Fysik på KTH - en av Sveriges mest prestigefyllda och konkurrenskraftiga utbildningar.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Jag vet exakt vad som krävs</strong> för att lyckas eftersom jag själv har gått igenom samma process. Varje övning, förklaring och strategi på denna plattform bygger på min egen erfarenhet och kunskap.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center">
                <i data-lucide="lightbulb" className="w-6 h-6 text-green-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Varför jag skapade MaFyProvet</h3>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              Under min egen förberedelse insåg jag att det fanns <strong className="text-slate-900">ingen organisation i Sverige</strong> som specialiserade sig på att hjälpa studenter med mattefysikprovet på ett strukturerat och effektivt sätt.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Jag ville skapa något bättre - en plattform där studenter får tillgång till allt de behöver på ett ställe, med material som faktiskt fungerar.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center">
                <i data-lucide="heart" className="w-6 h-6 text-purple-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Min vision</h3>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Att hjälpa varje student som drömmer om en teknisk utbildning att uppnå sitt mål. Jag tror på att <strong className="text-slate-900">rätt förberedelse + dedikation = framgång</strong>, och jag är här för att guida dig genom hela resan.
            </p>
          </div>
        </div>
      </div>

      {/* Key Achievements */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-10 border border-slate-200 shadow-lg">
        <h3 className="text-3xl font-bold text-slate-900 text-center mb-10">Viktiga milstolpar</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center group hover:scale-110 transition-transform">
            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">10k+</div>
            <div className="text-slate-700 font-medium">Hjälpta studenter</div>
          </div>
          <div className="text-center group hover:scale-110 transition-transform">
            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">92%</div>
            <div className="text-slate-700 font-medium">Godkända studenter</div>
          </div>
          <div className="text-center group hover:scale-110 transition-transform">
            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">5000+</div>
            <div className="text-slate-700 font-medium">Övningsuppgifter</div>
          </div>
          <div className="text-center group hover:scale-110 transition-transform">
            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">25+</div>
            <div className="text-slate-700 font-medium">Egna provkopior</div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="mt-16 text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-10 border-2 border-blue-200 shadow-lg">
        <h3 className="text-3xl font-bold text-slate-900 mb-4">Vill du komma i kontakt?</h3>
        <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
          Jag tar personlig kontakt med alla som är intresserade av Premium-medlemskap. Anmäl ditt intresse så hör jag av mig!
        </p>
        <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-10 py-4 rounded-full text-lg font-bold hover:from-blue-700 hover:to-blue-900 hover:scale-105 active:scale-95 transition-all shadow-xl" aria-label="Kontakta mig">
          Kontakta mig →
        </button>
      </div>
    </section>
  );
}

export default AboutFounder;
