import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ProfilPage from './ProfilPage';
import AllaProvPage from './AllaProvPage';
import StatistikPage from './StatistikPage';
import TestaDigSjalvPage from './TestaDigSjalvPage';
import PluggaTeoriPage from './PluggaTeoriPage';
import logo from '../assets/logo.png';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [location.pathname, sidebarOpen]);

  const handleMouseMove = (e) => {
    if (!sidebarRef.current) return;
    const rect = sidebarRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const menuItems = [
    { id: 'profil', label: 'Profil', icon: 'user', path: '/dashboard/profil' },
    { id: 'alla-prov', label: 'Alla Prov', icon: 'archive', path: '/dashboard/alla-prov' },
    { id: 'statistik', label: 'Statistik', icon: 'bar-chart-2', path: '/dashboard/statistik' },
    { id: 'testa-dig-sjalv', label: 'Testa dig själv', icon: 'clipboard-check', path: '/dashboard/testa-dig-sjalv' },
    { id: 'plugga-teori', label: 'Plugga Teori', icon: 'book', path: '/dashboard/plugga-teori' }
  ];

  const isActivePath = (path) => {
    return location.pathname === path || (path === '/dashboard/profil' && location.pathname === '/dashboard');
  };

  const isAllaProv = location.pathname === '/dashboard/alla-prov';

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        onMouseMove={handleMouseMove}
        className={`bg-[#0F172A] border-r border-slate-800 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col z-30 relative overflow-hidden group ${
          sidebarOpen ? 'w-72' : 'w-0 border-none'
        }`}
      >
        {/* Backlight Glow */}
        <div 
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.08), transparent 40%)`
          }}
        />

        <div className="w-72 flex flex-col h-full shrink-0">
          {/* Header Section */}
          <div className="h-24 flex items-center px-5 shrink-0 z-10">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-4 w-full p-0 border-none bg-transparent group/logo"
            >
              <div className={`w-12 h-12 shrink-0 rounded-xl overflow-hidden shadow-2xl transition-all duration-700 ease-out flex items-center justify-center ${
                sidebarOpen ? 'rotate-0 scale-100' : 'rotate-[360deg] scale-50 opacity-0'
              }`}>
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-contain block transform group-hover/logo:scale-110 transition-transform"
                />
              </div>
              <div className={`flex flex-col items-start transition-all duration-500 delay-100 ${
                sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}>
                <span className="text-white font-black text-2xl tracking-tighter leading-none">
                  MaFyProvet
                </span>
                <span className="text-yellow-500/60 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                  Premium
                </span>
              </div>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-2 z-10">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group/item relative ${
                  isActivePath(item.path)
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'
                }`}
              >
                <div className={`shrink-0 transition-transform duration-300 group-hover/item:scale-110 ${
                  isActivePath(item.path) ? 'text-emerald-400' : 'text-slate-500'
                }`}>
                  <i data-lucide={item.icon} className="w-5 h-5"></i>
                </div>
                <span className="text-sm font-semibold whitespace-nowrap">
                  {item.label}
                </span>
                {isActivePath(item.path) && (
                  <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                )}
              </button>
            ))}
          </nav>

          {/* Collapse Trigger */}
          <div className="p-6 z-10">
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-full h-12 flex items-center justify-center rounded-xl bg-slate-800/30 text-slate-500 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all duration-300 border border-slate-800/50 hover:border-emerald-500/20"
            >
              <i data-lucide="chevron-left" className="w-5 h-5"></i>
            </button>
          </div>
        </div>
      </aside>

      {/* Persistent Overlay Logo - Magnetic Spring Animation */}
      {!sidebarOpen && (
        <div className="fixed top-0 left-0 h-24 flex items-center px-5 z-40">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-0 w-12 h-12 rounded-xl overflow-hidden shadow-2xl shadow-black/40 bg-[#0F172A] border-none flex items-center justify-center animate-in fade-in zoom-in spin-in-180 duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-95 transition-transform"
          >
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-contain block"
            />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className={`flex-1 relative ${isAllaProv ? 'h-screen' : 'p-10 overflow-y-auto'}`}>
          <div className={isAllaProv ? 'w-full h-full' : 'max-w-7xl mx-auto'}>
            <Routes>
              <Route path="/" element={<ProfilPage />} />
              <Route path="/profil" element={<ProfilPage />} />
              <Route path="/alla-prov" element={<AllaProvPage />} />
              <Route path="/statistik" element={<StatistikPage />} />
              <Route path="/testa-dig-sjalv" element={<TestaDigSjalvPage />} />
              <Route path="/plugga-teori" element={<PluggaTeoriPage />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;