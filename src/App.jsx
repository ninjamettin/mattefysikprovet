import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
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
  }, [])

  return (
    <div className="bg-[#A4C4E3] min-h-screen text-slate-800 antialiased overflow-x-hidden">
      {/* Background Gradient */}
      <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-[#A4C4E3] via-[#C5D8EB] to-[#EBE6DD] pointer-events-none"></div>

      <Navigation />
      <Hero />
      <Dashboard />
      <AboutExam />
      <Features />
      <CoursePlans />
      <Testimonials />
      
      {/* Footer */}
      <footer id="kontakt" className="bg-slate-900 text-white py-16 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg viewBox="0 0 24 24" fill="currentColor" className="text-white w-5 h-5">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path>
                </svg>
                <span className="font-semibold text-lg">MaFyGuiden</span>
              </div>
              <p className="text-slate-400 text-sm">
                Din partner för att klara matematik- och fysikprovet.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Länkar</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#funktioner" className="hover:text-white transition-colors">Funktioner</a></li>
                <li><a href="#omprovet" className="hover:text-white transition-colors">Om provet</a></li>
                <li><a href="#kurser" className="hover:text-white transition-colors">Kurser</a></li>
                <li><a href="#referenser" className="hover:text-white transition-colors">Referenser</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Hjälpcenter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vanliga frågor</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontakta oss</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integritetspolicy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Följ oss</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <i data-lucide="facebook" className="w-5 h-5"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <i data-lucide="instagram" className="w-5 h-5"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <i data-lucide="youtube" className="w-5 h-5"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2025 MaFyGuiden. Alla rättigheter förbehållna.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
