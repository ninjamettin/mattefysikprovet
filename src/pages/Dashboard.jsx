import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, profilePic, logout } = useAuth();
  const [activePage, setActivePage] = useState('profil');

  useEffect(() => {
    // Initialize Lucide icons when page changes
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [activePage]);

  const menuItems = [
    { id: 'profil', label: 'Profil', icon: 'user' },
    { id: 'gamla-prov', label: 'Gamla Officiella Prov', icon: 'archive' },
    { id: 'vara-prov', label: 'Våra Prov', icon: 'file-text' },
    { id: 'statistik', label: 'Statistik', icon: 'bar-chart-2' },
    { id: 'testa-dig-sjalv', label: 'Testa dig själv', icon: 'clipboard-check' },
    { id: 'plugga-teori', label: 'Plugga Teori', icon: 'book' }
  ];

  const renderPage = () => {
    switch (activePage) {
      case 'profil':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Min Profil</h1>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <div className="flex items-center gap-6 mb-8">
                {profilePic ? (
                  <img src={profilePic} alt="Profil" className="w-20 h-20 rounded-full" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center">
                    <i data-lucide="user" className="w-10 h-10 text-slate-400"></i>
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{user?.email || 'Användare'}</h2>
                  <p className="text-slate-600">Medlemssida</p>
                </div>
              </div>
              <button 
                onClick={logout}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logga ut
              </button>
            </div>
          </div>
        );
      case 'gamla-prov':
        return <div className="text-2xl font-bold text-slate-900">Gamla Officiella Prov</div>;
      case 'vara-prov':
        return <div className="text-2xl font-bold text-slate-900">Våra Prov</div>;
      case 'statistik':
        return <div className="text-2xl font-bold text-slate-900">Statistik</div>;
      case 'testa-dig-sjalv':
        return <div className="text-2xl font-bold text-slate-900">Testa dig själv</div>;
      case 'plugga-teori':
        return <div className="text-2xl font-bold text-slate-900">Plugga Teori</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white shadow-lg pt-20">
        <div className="p-6">
          <nav className="space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activePage === item.id
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <i data-lucide={item.icon} className="w-5 h-5"></i>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-5xl">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
