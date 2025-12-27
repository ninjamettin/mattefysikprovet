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
    <section id="referenser" className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 bg-[#F9F9F8] -mx-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
          Riktiga resultat från riktiga studenter
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Över 10 000 studenter har klarat matematik- och fysikprovet med vår hjälp. Här är några av deras berättelser.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                <p className="text-sm text-green-600 font-medium">{testimonial.result}</p>
              </div>
            </div>
            <p className="text-slate-600 mb-4 leading-relaxed">{testimonial.text}</p>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-500">{testimonial.program}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 text-white text-center">
        <h3 className="text-3xl font-semibold mb-8">Våra studenter når sina mål</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-4xl font-bold mb-2">92%</div>
            <div className="text-slate-300">Godkänd första gången</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">35%</div>
            <div className="text-slate-300">Genomsnittlig höjning</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">10 000+</div>
            <div className="text-slate-300">Nöjda studenter</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">4.9/5</div>
            <div className="text-slate-300">Betyg från användare</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
