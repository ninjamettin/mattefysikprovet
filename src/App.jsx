import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import AboutExam from './components/AboutExam'
import Features from './components/Features'
import CoursePlans from './components/CoursePlans'
import Testimonials from './components/Testimonials'
import './App.css'

function App() {
  useEffect(() => {
    // Initialize Lucide icons after component mounts
    if (window.lucide) {
      window.lucide.createIcons()
    }

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <div className="bg-[#A4C4E3] min-h-screen text-slate-800 antialiased overflow-x-hidden">
      {/* Background Gradient */}
      <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-[#A4C4E3] via-[#C5D8EB] to-[#EBE6DD] pointer-events-none"></div>

      <Navigation />
      <Hero />
      <AboutExam />
      <Features />
      <CoursePlans />
      <Testimonials />
      
      {/* Footer */}
      <footer id="kontakt" className="bg-slate-900 text-white py-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="text-white w-6 h-6">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path>
                  </svg>
                </div>
                <span className="font-bold text-xl">MaFyGuiden</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Din partner för att klara matematik- och fysikprovet med framgång.
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <i data-lucide="mail" className="w-4 h-4"></i>
                <a href="mailto:info@mafyguiden.se" className="hover:text-white transition-colors">info@mafyguiden.se</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Länkar</h4>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#funktioner" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                  Funktioner
                </a></li>
                <li><a href="#omprovet" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                  Om provet
                </a></li>
                <li><a href="#kurser" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                  Kurser
                </a></li>
                <li><a href="#referenser" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                  Referenser
                </a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                  Hjälpcenter
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                  Vanliga frågor
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                  Kontakta oss
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                  Integritetspolicy
                </a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Följ oss</h4>
              <p className="text-slate-400 text-sm mb-4">Få tips och uppdateringar</p>
              <div className="flex gap-3">
                <a href="#" className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 transition-all group" aria-label="Facebook">
                  <i data-lucide="facebook" className="w-5 h-5 group-hover:scale-110 transition-transform"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 transition-all group" aria-label="Instagram">
                  <i data-lucide="instagram" className="w-5 h-5 group-hover:scale-110 transition-transform"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-red-500 hover:to-red-600 transition-all group" aria-label="YouTube">
                  <i data-lucide="youtube" className="w-5 h-5 group-hover:scale-110 transition-transform"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">&copy; 2025 MaFyGuiden. Alla rättigheter förbehållna.</p>
            <div className="flex gap-6 text-slate-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Användarvillkor</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
              <a href="#" className="hover:text-white transition-colors">GDPR</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
