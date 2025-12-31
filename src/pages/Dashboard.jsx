import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ProfilPage from './ProfilPage';
import AllaProvPage from './AllaProvPage';
import StatistikPage from './StatistikPage';
import TestaDigSjalvPage from './TestaDigSjalvPage';
import PluggaTeoriPage from './PluggaTeoriPage';
import logo from '../assets/logo.png';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Initialize Lucide icons when page changes
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [location.pathname]);

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
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div 
        className={`bg-slate-900 text-white shadow-lg transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } flex flex-col z-20`}
      >
        {/* Logo Section */}
        <div className={`p-6 flex ${sidebarOpen ? 'justify-start' : 'justify-center'}`}>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 group cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none outline-none"
          >
            <div className="w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden">
              <img 
                src={logo} 
                alt="MaFyProvet Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            {sidebarOpen && (
              <span className="text-lg font-bold tracking-tight whitespace-nowrap">
                MaFyProvet
              </span>
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="px-6 pb-6 flex-1">
          <nav className="space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 rounded-lg transition-all ${
                  isActivePath(item.path)
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
                title={!sidebarOpen ? item.label : ''}
              >
                <i data-lucide={item.icon} className="w-5 h-5 flex-shrink-0"></i>
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Toggle Button */}
        <div className="p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`w-full flex items-center justify-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-all duration-300 ${
              !sidebarOpen ? 'rotate-180' : ''
            }`}
            title={sidebarOpen ? 'Dölj meny' : 'Visa meny'}
          >
            <i data-lucide="chevron-left" className="w-5 h-5"></i>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isAllaProv ? 'p-0 overflow-hidden' : 'p-8'}`}>
        <div className={isAllaProv ? 'w-full h-full' : 'max-w-5xl'}>
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
    </div>
  );
};

export default Dashboard;
