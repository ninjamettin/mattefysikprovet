function Navigation() {
  return (
    <nav className="w-full pt-6 pb-4 px-6 md:px-12 flex justify-between items-center max-w-[1400px] mx-auto">
      <div className="flex items-center gap-2">
        <div className="relative w-6 h-6">
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-slate-900 w-6 h-6">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path>
          </svg>
        </div>
        <span className="text-xl font-semibold tracking-tight text-slate-900">MaFyGuiden</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-base font-medium text-slate-700">
        <a href="#funktioner" className="hover:text-slate-900 transition-colors">Funktioner</a>
        <a href="#omprovet" className="hover:text-slate-900 transition-colors">Om provet</a>
        <a href="#kurser" className="hover:text-slate-900 transition-colors">Kurser</a>
        <a href="#referenser" className="hover:text-slate-900 transition-colors">Referenser</a>
        <a href="#kontakt" className="hover:text-slate-900 transition-colors">Kontakt</a>
      </div>

      <div className="flex items-center gap-3">
        <button className="hidden md:block text-slate-700 px-4 py-2 text-base font-medium hover:text-slate-900 transition-colors">
          Logga in
        </button>
        <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-base font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
          Bli medlem gratis
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
