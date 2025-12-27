function Testimonials() {
  const testimonials = [
    {
      name: "Erik Andersson",
      result: "Från 45% till 92% på matematik",
      text: "Tack vare MaFyGuiden klarade jag provet med råge! Videogenomgångarna var otroligt pedagogiska och övningsuppgifterna var perfekt anpassade till provnivån.",
      program: "Civilingenjör, KTH"
    },
    {
      name: "Sara Lindström",
      result: "Klarat första försöket",
      text: "Jag var så nervös inför provet men med strukturerat material och bra handledning så klarade jag det på första försöket. Kan varmt rekommendera!",
      program: "Teknisk fysik, Chalmers"
    },
    {
      name: "Mohammed Hassan",
      result: "Höjde fysikdelen med 35%",
      text: "Fysikdelen kändes omöjlig från början men med alla förklaringar och exempel så började det faktiskt klicka. Supertacksam för all hjälp!",
      program: "Maskinteknik, LTH"
    },
    {
      name: "Anna Bergqvist",
      result: "95% på matematikdelen",
      text: "Materialet var exakt vad jag behövde. Bra struktur, tydliga förklaringar och massor av övning. Fick 95% på matten och är nu antagen till drömutbildningen!",
      program: "Datateknik, LiU"
    },
    {
      name: "Johan Svensson",
      result: "Godkänd efter 2 månaders studier",
      text: "Pluggade ca 1-2 timmar per dag i 2 månader och klarade provet. Premium-medlemskapet var värt varenda krona. Tack så mycket!",
      program: "Elektroteknik, Uppsala"
    },
    {
      name: "Fatima Al-Rahman",
      result: "Från underkänd till 88%",
      text: "Första gången jag skrev provet blev jag underkänd. Med MaFyGuiden fick jag struktur på studierna och förstod var mina luckor var. Andra gången fick jag 88%!",
      program: "Teknisk matematik, LTH"
    }
  ];

  return (
    <section id="referenser" className="max-w-[1400px] mx-auto px-6 md:px-12 py-32 bg-[#F9F9F8] -mx-6">
      <div className="text-center mb-20">
        <span className="inline-block px-4 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-4 animate-slide-in-from-top-3">
          Studentomdömen
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 animate-fade-in">
          Riktiga resultat från riktiga studenter
        </h2>
        <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
          Över 10 000 studenter har klarat matematik- och fysikprovet med vår hjälp. Här är några av deras berättelser.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-2xl hover:border-blue-200 hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-110 transition-transform">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">{testimonial.name}</h4>
                <p className="text-sm text-green-600 font-semibold flex items-center gap-1">
                  <i data-lucide="trending-up" className="w-4 h-4"></i>
                  {testimonial.result}
                </p>
              </div>
            </div>
            <p className="text-slate-700 mb-5 leading-relaxed">{testimonial.text}</p>
            <div className="pt-5 border-t-2 border-slate-100">
              <p className="text-sm text-slate-600 font-medium flex items-center gap-2">
                <i data-lucide="graduation-cap" className="w-4 h-4 text-slate-400"></i>
                {testimonial.program}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 md:p-16 text-white text-center shadow-2xl">
        {/* Decorative gradients */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full translate-x-48 translate-y-48 blur-3xl"></div>
        
        <div className="relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold mb-12">Våra studenter når sina mål</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="group hover:scale-110 transition-transform">
              <div className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">92%</div>
              <div className="text-slate-300 text-sm md:text-base">Godkänd första gången</div>
            </div>
            <div className="group hover:scale-110 transition-transform">
              <div className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">35%</div>
              <div className="text-slate-300 text-sm md:text-base">Genomsnittlig höjning</div>
            </div>
            <div className="group hover:scale-110 transition-transform">
              <div className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">10k+</div>
              <div className="text-slate-300 text-sm md:text-base">Nöjda studenter</div>
            </div>
            <div className="group hover:scale-110 transition-transform">
              <div className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">4.9/5</div>
              <div className="text-slate-300 text-sm md:text-base">Betyg från användare</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
