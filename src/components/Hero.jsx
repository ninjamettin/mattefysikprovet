import { useState, useEffect } from 'react'
import bgImage from '../assets/mattefysik_landing.png'

function Hero() {
  const [currentSentence, setCurrentSentence] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [sentenceIdx, setSentenceIdx] = useState(0)

  const sentences = [
    { text: "Varför ska du inte doktorera och bli en ", highlight: "fysiker" },
    { text: "Bli en ", highlight: "datortekniker", after: " och programmera nästa ChatGPT" },
    { text: "Vill du bli en ", highlight: "civilingenjör", after: " och designa framtidens städer?" },
    { text: "Drömmer du om att bli en ", highlight: "rymdingenjör", after: " på SpaceX?" },
    { text: "Kan du se dig som en ", highlight: "maskiningenjör", after: " som bygger robotar?" },
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
    
    const typingSpeed = isDeleting ? 30 : 80;
    const pauseAfterComplete = 2000;
    const pauseBeforeDelete = 1000;

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
    <main className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image - High Opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-95"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent"></div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 w-full">
        <div className="max-w-4xl backdrop-blur-sm bg-white/30 p-10 rounded-3xl shadow-2xl border border-white/40">
          {/* Main Headline - Left aligned */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-10 leading-[1.1]">
            Dominera matematik och fysikprovet
          </h1>
          
          {/* Three Bullet Points - Clean Checkmarks */}
          <div className="space-y-5 mb-14">
            <div className="flex items-start gap-4 group">
              <svg className="flex-shrink-0 w-7 h-7 text-green-600 mt-1 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-lg md:text-xl text-slate-900 font-semibold leading-relaxed">
                Grundad av Teknisk Fysiker
              </p>
            </div>
            
            <div className="flex items-start gap-4 group">
              <svg className="flex-shrink-0 w-7 h-7 text-green-600 mt-1 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-lg md:text-xl text-slate-900 font-semibold leading-relaxed">
                Coaching och lösningsförslag för ALLA gamla prov + våra egna 
              </p>
            </div>
            
            <div className="flex items-start gap-4 group">
              <svg className="flex-shrink-0 w-7 h-7 text-green-600 mt-1 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-lg md:text-xl text-slate-900 font-semibold leading-relaxed">
                Ingen annan än oss erbjuder denna tjänst i Sverige. 
              </p>
            </div>
          </div>

          {/* Typewriter Animation - Professional Design */}
          <div className="min-h-[100px] bg-slate-900/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-slate-700">
            <p className="text-xl md:text-2xl text-white leading-relaxed font-light">
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
              <span className="inline-block w-0.5 h-6 bg-emerald-400 ml-1 animate-pulse"></span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
