import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Features from './components/Features'
import CoursePlans from './components/CoursePlans'
import AboutExam from './components/AboutExam'
import AboutUs from './components/AboutUs'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import logo from './assets/logo.png'
import './App.css'

// Google Client ID from environment variables
const GOOGLE_CLIENT_ID = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID || ''

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <CoursePlans />
    </>
  )
}

function ScrollToTop() {
  const location = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
    // Re-initialize Lucide icons on route change
    if (window.lucide) {
      setTimeout(() => window.lucide.createIcons(), 100)
    }
  }, [location.pathname])
  
  return null
}

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
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
        <div className="bg-[#FAF9F6] min-h-screen text-slate-900 antialiased overflow-x-hidden relative">
          {/* Animated Background */}
          <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-[#FAF9F6] via-[#F5F3EF] to-[#EAE7E0]"></div>
          
          {/* Geometric 3D Elements */}
          <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-slate-200/30 rotate-45 animate-float"></div>
            <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-emerald-300/20 rounded-full animate-float-delayed"></div>
            <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-br from-slate-100/20 to-transparent backdrop-blur-sm rotate-12 animate-rotate-slow"></div>
          </div>

          <ScrollToTop />
          <Navigation />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/om-provet" element={<AboutExam />} />
            <Route path="/om-oss" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        
          {/* Footer */}
          <footer id="kontakt" className="bg-white border-t border-slate-200 py-8 px-6 md:px-12">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
              {/* Left side - Logo and Company Info */}
              <div className="flex items-start gap-6">
                <img src={logo} alt="Mattefysikprovet Logo" className="w-12 h-12 rounded-lg" />
                <div className="text-sm text-slate-600 leading-relaxed">
                  <p className="font-bold text-slate-900 mb-1">Mattefysikprovet</p>
                  <p>GUNDOGDU AB</p>
                  <p>2838-284</p>
                  <p>176 72 Järfälla</p>
                  <p className="mt-2">
                    <a href="mailto:support@mattefysikprovet.se" className="text-slate-900 hover:text-emerald-600 transition-colors">
                      support@mattefysikprovet.se
                    </a>
                  </p>
                  <p className="mt-2">
                    <a href="#" className="text-slate-900 hover:text-emerald-600 transition-colors underline">
                      Användarvillkor
                    </a>
                  </p>
                </div>
              </div>

              {/* Right side - Scroll to Top Button */}
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-14 h-14 bg-slate-900 hover:bg-emerald-600 rounded-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg group"
                aria-label="Scroll to top"
                style={{ outline: 'none' }}
              >
                <i data-lucide="arrow-up" style={{ width: '42px', height: '42px', strokeWidth: '2.5px' }} className="text-white"></i>
              </button>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App
