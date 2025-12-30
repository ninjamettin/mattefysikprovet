import { useAuth } from '../context/AuthContext';

const ProfilPage = () => {
  const { user, profilePic, logout } = useAuth();

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
};

export default ProfilPage;
