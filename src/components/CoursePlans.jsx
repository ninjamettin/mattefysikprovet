import { useState, useMemo } from 'react';

function CoursePlans() {
  const [freePlanTilt, setFreePlanTilt] = useState({ rotateX: 0, rotateY: 8 });
  const [premiumPlanTilt, setPremiumPlanTilt] = useState({ rotateX: 0, rotateY: -8 });
  const [isHoveringPremium, setIsHoveringPremium] = useState(false);

  // Memoize particles to prevent re-render jitter during mouse movement
  const particles = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      // Faster duration: 1.5-3.5s instead of 2-5s
      duration: 1.5 + Math.random() * 2, 
      height: 20 + Math.random() * 60
    }));
  }, []);

  const embers = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      // Faster duration: 2-4s instead of 3-5s
      duration: 2 + Math.random() * 2
    }));
  }, []);

  const handleMouseMove = (e, setter, initialRotateY) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 8; // -8 to 8 degrees
    const rotateX = ((centerY - y) / centerY) * 8; // -8 to 8 degrees
    
    setter({ rotateX, rotateY });
  };

  const handleMouseLeave = (setter, initialRotateY) => {
    setter({ rotateX: 0, rotateY: initialRotateY });
  };

  return (
    <section id="kurser" className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 pb-20 relative">
      {/* Floating 3D Element */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-slate-100 rounded-full blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      
      <div className="text-center mb-16">

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
          Välj din studieplan
        </h2>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto" style={{perspective: '2000px'}}>
        {/* Free Plan */}
        <div 
          className="group bg-white rounded-2xl p-10 shadow-lg border border-slate-200 hover:shadow-2xl transition-all duration-500 flex flex-col"
          style={{
            transform: `rotateX(${freePlanTilt.rotateX}deg) rotateY(${freePlanTilt.rotateY}deg)`,
            transition: 'transform 0.2s ease-out, box-shadow 0.5s'
          }}
          onMouseMove={(e) => handleMouseMove(e, setFreePlanTilt, 8)}
          onMouseLeave={() => handleMouseLeave(setFreePlanTilt, 8)}
        >
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Gratis</h3>
            <p className="text-slate-600 leading-relaxed">Perfekt för att komma igång</p>
          </div>

          <ul className="space-y-3 mb-8 flex-grow">
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">500+ övningsuppgifter</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">20 videogenomgångar</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">Grundläggande lösningar</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">Formelblad och tips</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">Personlig handledning</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0"></i>
              <span className="text-slate-700">Detaljerade analyser</span>
            </li>
          </ul>

          <button className="w-full bg-slate-100 text-slate-900 py-3.5 font-semibold hover:bg-slate-200 transition-all" aria-label="Kom igång gratis">
            Kom igång gratis
          </button>
        </div>

        {/* Premium Plan */}
        <div 
          className="group bg-slate-900 rounded-2xl p-10 shadow-[0_0_20px_rgba(234,179,8,0.15)] relative overflow-hidden border-[3px] border-yellow-500/70 hover:border-yellow-400 hover:shadow-[0_0_50px_rgba(234,179,8,0.4)] transition-all duration-500 flex flex-col"
          style={{
            transform: `rotateX(${premiumPlanTilt.rotateX}deg) rotateY(${premiumPlanTilt.rotateY}deg)`,
            transition: 'transform 0.2s ease-out, box-shadow 0.5s'
          }}
          onMouseMove={(e) => handleMouseMove(e, setPremiumPlanTilt, -8)}
          onMouseEnter={() => setIsHoveringPremium(true)}
          onMouseLeave={() => {
            handleMouseLeave(setPremiumPlanTilt, -8);
            setIsHoveringPremium(false);
          }}
        >
          {/* Shiny Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-yellow-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          {/* Digital Fire Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Base Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-orange-600/20 via-yellow-500/10 to-transparent blur-2xl opacity-60" />
            
            {/* Rising Digital Bits */}
            {particles.map((p, i) => {
              // Show first 15 always, show rest only on hover
              const isVisible = i < 15 || isHoveringPremium;
              if (!isVisible) return null;

              return (
                <div 
                  key={p.id}
                  className="absolute bottom-0 w-[2px] bg-gradient-to-t from-orange-400 to-transparent animate-digital-fire opacity-0"
                  style={{
                    left: `${p.left}%`,
                    animationDelay: `${p.delay}s`,
                    animationDuration: `${p.duration}s`,
                    height: `${p.height}px`
                  }}
                />
              );
            })}
            
            {/* Rising Embers */}
            {embers.map((e, i) => {
              // Show first 8 always, show rest only on hover
              const isVisible = i < 8 || isHoveringPremium;
              if (!isVisible) return null;

              return (
                <div 
                  key={`ember-${e.id}`}
                  className="absolute bottom-0 w-1 h-1 bg-yellow-300 rounded-full blur-[1px] animate-digital-fire opacity-0"
                  style={{
                    left: `${e.left}%`,
                    animationDelay: `${e.delay}s`,
                    animationDuration: `${e.duration}s`
                  }}
                />
              );
            })}
          </div>

          
          <div className="mb-8 relative z-10">
            <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
              Premium 
            </h3>
            <p className="text-slate-300 leading-relaxed">Full tillgång och experthjälp</p>
          </div>

          <ul className="space-y-3 mb-8 relative z-10 flex-grow">
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.8)] mt-0.5 flex-shrink-0"></i>
              <span className="text-white font-medium">5 000+ övningsuppgifter</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.8)] mt-0.5 flex-shrink-0"></i>
              <span className="text-white">200+ videogenomgångar</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.8)] mt-0.5 flex-shrink-0"></i>
              <span className="text-white">Expertförklaringar</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.8)] mt-0.5 flex-shrink-0"></i>
              <span className="text-white">Personlig handledare</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.8)] mt-0.5 flex-shrink-0"></i>
              <span className="text-white">Detaljerade analyser</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.8)] mt-0.5 flex-shrink-0"></i>
              <span className="text-white">Simulerade prov</span>
            </li>
            <li className="flex items-start gap-3">
              <i data-lucide="check" className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.8)] mt-0.5 flex-shrink-0"></i>
              <span className="text-white font-medium">Skräddarsytt upplägg</span>
            </li>
          </ul>

          <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 py-3.5 font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all relative z-10 shadow-lg shadow-yellow-500/20" aria-label="Välj Premium">
            Välj Premium
          </button>
        </div>
      </div>

      

      {/* Intresseanmälan Section */}
      <div id="intresseanmälan" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 md:p-16 text-white shadow-2xl">
        {/* Decorative gradients */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full translate-x-48 translate-y-48 blur-3xl"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-block p-3 bg-white/10 rounded-2xl mb-6">
            <i data-lucide="message-circle-question-mark" className="w-12 h-12 text-white"></i>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Intresseanmälan</h3>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Är du intresserad av att få personlig kontakt med oss?
          </p>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed">
            <strong className="text-white">Vi garanterar att svara inom 24 timmar</strong> för att diskutera din studiesituation och hur vi bäst kan hjälpa dig att klara matematik- och fysikprovet.
          </p>
          
          {/* Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-6 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input 
                type="text" 
                placeholder="Ditt namn" 
                className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-4 text-white placeholder:text-slate-300 focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all"
              />
              <input 
                type="email" 
                placeholder="Din e-postadress" 
                className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-4 text-white placeholder:text-slate-300 focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all"
              />
            </div>
            <textarea 
              placeholder="Berätta kort om din studiesituation och dina mål..." 
              rows="4"
              className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-4 text-white placeholder:text-slate-300 focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all resize-none"
            ></textarea>
          </div>
          
          <button className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:from-emerald-600 hover:to-green-600 hover:scale-105 active:scale-95 transition-all shadow-2xl mt-6" aria-label="Skicka intresseanmälan">
            Skicka intresseanmälan →
          </button>

        </div>
      </div>
    </section>
  );
}

export default CoursePlans;
