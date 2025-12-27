import { useState, useEffect } from 'react'
import bgImage from '../assets/mattefysik_landing.png'

function Hero() {
  const [currentSentence, setCurrentSentence] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [sentenceIdx, setSentenceIdx] = useState(0)
  const [titleChars, setTitleChars] = useState(0)
  const [bullet1Chars, setBullet1Chars] = useState(0)
  const [bullet2Chars, setBullet2Chars] = useState(0)
  const [bullet3Chars, setBullet3Chars] = useState(0)

  const titleLine1 = "Dominera"
  const titleLine2 = "matematik och fysikprovet"
  const bullet1Text = "Grundad av Teknisk Fysiker"
  const bullet2Text = "Lösningsförslag till ALLA gamla officiella prov + våra"
  const bullet3Text = "25+ av våra perfekta kopior för att kunna träna många fler gånger istället för bara få antal gamla prov"

  // Animate title and bullets letter by letter
  useEffect(() => {
    const totalTitleLength = titleLine1.length + titleLine2.length
    const titleTimer = setTimeout(() => {
      if (titleChars < totalTitleLength) {
        setTitleChars(titleChars + 1)
      }
    }, 30)

    // Start all bullets at the same time after title finishes
    const bulletTimer = setTimeout(() => {
      if (titleChars >= totalTitleLength) {
        if (bullet1Chars < bullet1Text.length) setBullet1Chars(bullet1Chars + 1)
        if (bullet2Chars < bullet2Text.length) setBullet2Chars(bullet2Chars + 1)
        if (bullet3Chars < bullet3Text.length) setBullet3Chars(bullet3Chars + 1)
      }
    }, 30)

    return () => {
      clearTimeout(titleTimer)
      clearTimeout(bulletTimer)
    }
  }, [titleChars, bullet1Chars, bullet2Chars, bullet3Chars])

  const sentences = [
    { text: "Varför ska du inte doktorera och bli en ", highlight: "fysiker?" },
    { text: "Bli en ", highlight: "datortekniker", after: " och programmera nästa ChatGPT" },
    { text: "Vill du bli en ", highlight: "civilingenjör", after: " och designa framtidens städer?" },
    { text: "Drömmer du om att bli en ", highlight: "rymdingenjör", after: " på SpaceX?" },
    { text: "Varför ska du inte vara en ", highlight: "maskiningenjör", after: " som bygger robotar?" },
    { text: "Varför inte bli en ", highlight: "elektroingenjör", after: " och utveckla AI-chips?" },
    { text: "Tänk dig att vara en ", highlight: "bioteknolog", after: " som botar cancer" },
    { text: "Bli en ", highlight: "energiingenjör", after: " och rädda planeten" },
    { text: "Se dig som en ", highlight: "mjukvaruutvecklare", after: " på Google" },
    { text: "Kanske är du en framtida ", highlight: "kärnfysiker", after: " på CERN?" },
    { text: "Vill du bli en ", highlight: "flygteknikingenjör", after: " hos Airbus?" },
    { text: "Drömmer du om att vara en ", highlight: "nanoteknikforskare", after: "?" },
    { text: "Bli en ", highlight: "AI-ingenjör", after: " och forma framtiden" },
    { text: "Se dig som en ", highlight: "medicintekniker", after: " som räddar liv" },
    { text: "Varför inte bli en ", highlight: "automationsingenjör", after: "?" },
    { text: "Tänk dig att vara en ", highlight: "kvantdataforskare", after: "" },
    { text: "Bli en ", highlight: "kemitekniker", after: " på ett läkemedelsföretag" },
    { text: "Vill du vara en ", highlight: "materialvetare", after: " och uppfinna nya material?" },
    { text: "Drömmer du om att bli en ", highlight: "cybersäkerhetsexpert", after: "?" },
    { text: "Kan du se dig som en ", highlight: "datateknikingenjör", after: " på Apple?" }
  ];

  useEffect(() => {
    const currentSentenceData = sentences[sentenceIdx];
    const fullText = currentSentenceData.text + currentSentenceData.highlight + (currentSentenceData.after || '');
    
    // Decaying typing speed - starts fast (20ms), ends slow (120ms)
    const progress = currentIndex / fullText.length;
    const typingSpeed = isDeleting ? 30 : 20 + (progress * 100); // Easing: 20ms -> 120ms
    const pauseBeforeDelete = 1500;

    if (!isDeleting && currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setCurrentSentence(fullText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else if (!isDeleting && currentIndex === fullText.length) {
      const timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseBeforeDelete);
      return () => clearTimeout(timer);
    } else if (isDeleting && currentIndex > 0) {
      const timer = setTimeout(() => {
        setCurrentSentence(fullText.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else if (isDeleting && currentIndex === 0) {
      setIsDeleting(false);
      setSentenceIdx((sentenceIdx + 1) % sentences.length);
    }
  }, [currentIndex, isDeleting, sentenceIdx]);

  return (
    <main className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-20">
      {/* Background Image - High Opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-top bg-no-repeat opacity-95"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent"></div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 w-full" style={{perspective: '2000px'}}>
        <div className="max-w-5xl bg-white/60 backdrop-blur-xl p-12 rounded-2xl shadow-2xl border border-slate-200/50 relative overflow-hidden" style={{animation: 'rotateInX 1s ease-out forwards'}}>
          {/* Main Headline - Left aligned, Two Lines */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-10 leading-[1.1] min-h-[120px] md:min-h-[140px]">
            {titleLine1.substring(0, Math.min(titleChars, titleLine1.length))}<br />
            {titleChars > titleLine1.length && titleLine2.substring(0, titleChars - titleLine1.length)}
          </h1>
          
          {/* Three Bullet Points - Bigger, Sharper Checkmarks */}
          <div className="space-y-5 mb-8">
            <div className="flex items-center gap-5 group">
              <svg className="flex-shrink-0 w-10 h-10 text-green-600 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-lg md:text-xl text-slate-900 font-semibold leading-tight">
                {bullet1Text.substring(0, bullet1Chars)}
              </p>
            </div>
            
            <div className="flex items-center gap-5 group">
              <svg className="flex-shrink-0 w-10 h-10 text-green-600 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-lg md:text-xl text-slate-900 font-semibold leading-tight">
                {bullet2Text.substring(0, bullet2Chars)}
              </p>
            </div>
            
            <div className="flex items-center gap-5 group">
              <svg className="flex-shrink-0 w-10 h-10 text-green-600 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-lg md:text-xl text-slate-900 font-semibold leading-tight">
                {bullet3Text.substring(0, bullet3Chars)}
              </p>
            </div>
          </div>

          {/* Typewriter Animation - Optimized Height & Cursor */}
          <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-slate-700 animate-in fade-in slide-in-from-left-8 duration-700 delay-700 mb-8">
            <div className="flex items-center min-h-[32px]">
              <p className="text-xl md:text-2xl text-white font-light leading-none">
                {currentSentence.split('').map((char, idx) => {
                  const currentData = sentences[sentenceIdx];
                  const highlightStart = currentData.text.length;
                  const highlightEnd = highlightStart + currentData.highlight.length;
                  
                  if (idx >= highlightStart && idx < highlightEnd) {
                    return (
                      <span key={idx} className="text-emerald-400 font-bold">
                        {char}
                      </span>
                    );
                  }
                  return <span key={idx}>{char}</span>;
                })}
                <span className="inline-block w-0.5 h-7 bg-emerald-400 ml-1 align-middle animate-pulse"></span>
              </p>
            </div>
          </div>

          {/* CTA Button inside card */}
          <button className="px-10 py-4 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 animate-in fade-in slide-in-from-left-8 duration-700 delay-900 relative group overflow-hidden focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2" aria-label="Testa Gratis Nu">
            <span className="relative z-10">Testa Gratis Nu →</span>
            <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Hero;
