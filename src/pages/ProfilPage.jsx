import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfilPage = () => {
  const { user, profilePic, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    console.log('handleLogout called in ProfilPage');
    try {
      await logout();
      console.log('Logout successful, closing modal and navigating');
      setShowLogoutConfirm(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error in ProfilPage:', error);
    }
  };

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
          onClick={() => setShowLogoutConfirm(true)}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Logga ut
        </button>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Logga ut?</h3>
            <p className="text-slate-600 mb-6">Är du säker på att du vill logga ut?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2.5 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Avbryt
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors"
              >
                Logga ut
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilPage;
