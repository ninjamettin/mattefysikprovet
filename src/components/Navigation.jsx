import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        // Scrolling up or at top
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleNavigation = (path) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const element = document.querySelector(path)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      const element = document.querySelector(path)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setMobileMenuOpen(false)
  }

  return (
    <nav 
      className={`w-full py-5 px-6 md:px-8 lg:px-12 fixed top-0 z-50 transition-all duration-500 ease-out bg-white border-b border-slate-100 shadow-sm ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex justify-between items-center max-w-[1440px] mx-auto">
        {/* Logo Section */}
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-sm ring-1 ring-gray-200/50 group-hover:ring-gray-300/50 transition-all">
            <img 
              src={logo} 
              alt="MaFyProvet Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
            MaFyProvet
          </span>
        </div>

        {/* Desktop Menu - Center */}
        <div className="hidden lg:flex items-center gap-8">
          <button 
            onClick={() => navigate('/vad-ar-det-har')}
            className="text-[15px] font-medium text-slate-700 hover:text-slate-900 transition-all duration-200 relative group bg-transparent border-none outline-none rounded-none p-0"
          >
            Vad är det här?
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => navigate('/om-grundaren')}
            className="text-[15px] font-medium text-slate-700 hover:text-slate-900 transition-all duration-200 relative group bg-transparent border-none outline-none rounded-none p-0"
          >
            Om grundaren
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>

        {/* Desktop CTAs - Right */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            className="text-[15px] font-medium text-slate-900 hover:text-slate-700 transition-colors bg-transparent border-none outline-none rounded-none p-0" 
            aria-label="Logga in"
          >
            Logga in
          </button>
          <button 
            className="px-6 py-2.5 text-[15px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2" 
            aria-label="Testa Gratis Nu"
          >
            Testa Gratis Nu
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
          aria-label="Öppna meny"
          aria-expanded={mobileMenuOpen}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-2 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col gap-2 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
            <button 
              onClick={() => {
                navigate('/vad-ar-det-har')
                setMobileMenuOpen(false)
              }}
              className="px-4 py-3 text-[15px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all text-left"
            >
              Vad är det här?
            </button>
            <button 
              onClick={() => {
                navigate('/om-grundaren')
                setMobileMenuOpen(false)
              }}
              className="px-4 py-3 text-[15px] font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all text-left"
            >
              Om grundaren
            </button>
            <div className="border-t border-gray-100 pt-3 mt-2 flex flex-col gap-2">
              <button className="px-4 py-3 text-[15px] font-bold text-slate-900 bg-white border-2 border-slate-300 rounded-xl transition-all text-left">
                Logga in
              </button>
              <button className="px-6 py-3 text-[15px] font-bold text-white bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl transition-all shadow-lg">
                Testa Gratis Nu
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
