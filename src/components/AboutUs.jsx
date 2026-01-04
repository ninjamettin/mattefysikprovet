import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import aboutUsImage from '../assets/aboutus_1.png';

/**
 * AboutUs Component
 * - Full-width rectangular sections (No rounded corners)
 * - Asymmetrical alignment and diagonal geometric styling
 * - High-performance 3D transforms via CSS Variables
 * - System cursor restored
 */
function AboutUs() {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [isHoveringVision, setIsHoveringVision] = useState(false);

  // High-performance mouse tracking for 3D effects (Zero state re-renders)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const xPct = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const yPct = (clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      
      containerRef.current.style.setProperty('--mouse-x-pct', xPct);
      containerRef.current.style.setProperty('--mouse-y-pct', yPct);
      containerRef.current.style.setProperty('--mouse-x-px', `${clientX}px`);
      containerRef.current.style.setProperty('--mouse-y-px', `${clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.dataset.section]));
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleContactClick = () => {
    navigate('/#intresseanmälan');
  };

  const handleStartClick = () => {
    navigate('/#kurser');
  };

  return (
    <main 
      ref={containerRef}
      className="bg-[#FAF9F6] text-slate-900 selection:bg-blue-500 overflow-x-hidden"
      style={{
        '--mouse-x-pct': 0,
        '--mouse-y-pct': 0,
        '--tilt-intensity': '10deg'
      }}
    >
      {/* Dynamic Background Gradient */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x-px) var(--mouse-y-px), rgba(59, 130, 246, 0.15), transparent 80%)`
        }}
      />

      {/* Section 1: Vilka är vi? (Left Aligned / Geometric Split) */}
      <section 
        ref={(el) => (sectionRefs.current[0] = el)}
        data-section="section1"
        className="relative w-full min-h-screen flex items-center overflow-hidden border-b border-slate-200"
      >
        <div 
          className="absolute inset-0 bg-blue-500/5 skew-y-3 origin-right translate-y-20 transition-transform duration-1000" 
          style={{ transform: visibleSections.has('section1') ? 'skewY(-3deg) translateY(0)' : 'skewY(0) translateY(100%)' }}
        />
        
        <div className="relative z-10 w-full px-8 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className={`transition-all duration-1000 delay-300 ${visibleSections.has('section1') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8 text-slate-900">
              Vilka <br /> <span className="text-blue-600">Är Vi?</span>
            </h1>
            <p className="text-xl md:text-3xl font-light text-slate-600 max-w-xl leading-relaxed">
              Vi är tekniska fysiker från KTH. Vi har knäckt koden för matematik- och fysikprovet och transformerar nu hur studenter förbereder sig för sin framtid.
            </p>
          </div>
          <div className={`hidden md:flex justify-end items-center transition-all duration-1000 delay-500 ${visibleSections.has('section1') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <img 
              src={aboutUsImage} 
              alt="KTH Emblem" 
              className="max-w-full h-auto max-h-[800px] object-contain drop-shadow-2xl scale-[1.5] origin-right"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Varför skapade vi... (Right Aligned / 3D Rotation) */}
      <section 
        ref={(el) => (sectionRefs.current[1] = el)}
        data-section="section2"
        className="relative w-full min-h-screen flex items-center bg-[#FAF9F6] text-slate-900 py-24 overflow-hidden"
      >
        <div className="relative z-10 w-full px-8 md:px-20 flex flex-col items-end text-right">
          <div 
            className="perspective-1000 transform-gpu"
            style={{
              transform: `
                rotateX(calc(var(--mouse-y-pct) * var(--tilt-intensity) * -1))
                rotateY(calc(var(--mouse-x-pct) * var(--tilt-intensity)))
              `,
              willChange: 'transform'
            }}
          >
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-12 text-slate-900">
              Varför skapade vi <br /> 
              <span className="bg-blue-600 text-white px-4">mattefysikprovet.se?</span>
            </h2>
          </div>

          <div className={`max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-1000 ${visibleSections.has('section2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="group relative p-10 border border-slate-200 bg-white shadow-xl hover:border-blue-500/50 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
              <div className="relative z-10">
                <span className="text-5xl font-black mb-6 block text-blue-100 group-hover:text-white transition-colors">01</span>
                <p className="text-xl font-light leading-relaxed text-slate-600 group-hover:text-white transition-colors">
                  Bristen på specialiserat material i Sverige lämnade studenter i mörkret. <span className="font-bold text-blue-600 group-hover:text-white">Vi tände ljuset.</span>
                </p>
              </div>
            </div>
            <div className="group relative p-10 border border-slate-200 bg-white shadow-xl hover:border-blue-500/50 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
              <div className="relative z-10">
                <span className="text-5xl font-black mb-6 block text-blue-100 group-hover:text-white transition-colors">02</span>
                <p className="text-xl font-light leading-relaxed text-slate-600 group-hover:text-white transition-colors">
                  Vi ville demokratisera tillgången till de strategier som krävs för att nå <span className="font-bold text-blue-600 group-hover:text-white">KTH och Chalmers.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Vision (Center Aligned / Full Width Image/Pattern Overlay) */ }
      <section 
        ref={(el) => (sectionRefs.current[2] = el)}
        data-section="section3"
        className="relative w-full min-h-[80vh] flex flex-col items-center justify-center border-t border-slate-200 bg-white overflow-hidden"
      >
        {/* Giant Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-slate-50 select-none pointer-events-none whitespace-nowrap z-0">
          VISION
        </div>

        {/* Strong Mouse Light Effect */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x-px) var(--mouse-y-px), rgba(37, 99, 235, 0.15), transparent 40%)`
          }}
        />
        
        <div className={`relative z-10 max-w-7xl w-full mx-auto px-8 md:px-0 transition-all duration-1000 ${visibleSections.has('section3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          {/* Main Content - Left Aligned */}
          <div className="text-left max-w-4xl">
            <h2 className="text-7xl md:text-9xl font-black uppercase mb-12 text-slate-900 tracking-tighter relative inline-block">
              Vår <span className="text-blue-600">Vision</span>
              {/* Decorative underline */}
              <div className="absolute -bottom-4 left-5 w-1/3 h-2 bg-blue-600" />
            </h2>
            
            <p className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight mb-50">
              ATT VARA DEN SJÄLVKLARA <span className="text-blue-600">KATALYSATORN</span> FÖR NÄSTA GENERATIONS INGENJÖRER.
            </p>
            
          </div>
        </div>
      </section>

      {/* Section 4: Stats (Asymmetric Grid) */}
      <section 
        ref={(el) => (sectionRefs.current[3] = el)}
        data-section="section4"
        className="w-full grid grid-cols-1 md:grid-cols-4 bg-[#FAF9F6] border-y border-slate-200"
      >
        {[
          { label: 'Hjälpta studenter', val: '10 000+' },
          { label: 'Godkända', val: '92%' },
          { label: 'Övningsuppgifter', val: '5000+' },
          { label: 'Provkopior', val: '25+' }
        ].map((s, i) => (
          <div key={i} className="group p-16 border-r border-slate-200 last:border-r-0 hover:bg-blue-600 transition-colors duration-300">
            <div className="text-6xl font-black mb-2 text-slate-900 group-hover:text-white transition-colors">{s.val}</div>
            <div className="text-sm uppercase tracking-widest text-slate-500 group-hover:text-blue-100 transition-colors">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Section 5: Contact (Full Screen Contrast) */}
      <section 
        ref={(el) => (sectionRefs.current[4] = el)}
        data-section="section5"
        className="relative w-full h-screen flex flex-col items-center justify-center bg-blue-600 text-white"
      >
        <div className="absolute inset-0 overflow-hidden">
            <div 
              className="text-[20vw] font-black opacity-10 whitespace-nowrap select-none"
              style={{ transform: `translateX(calc(var(--mouse-x-pct) * -50px))` }}
            >
              KONTAKTA OSS KONTAKTA OSS
            </div>
        </div>
        
        <div className={`relative z-10 text-center transition-all duration-1000 delay-200 ${visibleSections.has('section5') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h3 className="text-6xl md:text-9xl font-black uppercase mb-12 leading-none">Redo att <br/> dominera?</h3>
          
          <div className="flex flex-col gap-6 items-center">
            <button 
              onClick={handleStartClick}
              className="group relative bg-white text-black px-20 py-8 text-2xl font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
            >
              Börja nu
              <div className="absolute inset-0 border-2 border-white translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
            </button>

            <button 
              onClick={handleContactClick}
              className="group relative bg-black text-white px-20 py-8 text-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              Anmäl Intresse
              <div className="absolute inset-0 border-2 border-black translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        .perspective-1000 { perspective: 1000px; }
        .transform-gpu { transform-style: preserve-3d; }
      ` }} />
    </main>
  );
}

export default AboutUs;