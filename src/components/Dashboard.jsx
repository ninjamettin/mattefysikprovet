function Dashboard() {
  return (
    <div className="w-full max-w-[1200px] dashboard-entrance bg-[#F5F5F3] rounded-[2rem] p-2 shadow-2xl shadow-slate-600/20 border border-white/40 mb-20 relative overflow-hidden mx-auto">
      {/* Inner Window */}
      <div className="bg-white rounded-[1.7rem] flex overflow-hidden min-h-[700px]">
        
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col py-6 px-4">
          <div className="flex items-center gap-2 mb-8 px-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-slate-900 w-5 h-5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
            </svg>
            <span className="font-semibold text-lg tracking-tight">MaFyProvet</span>
            <i data-lucide="chevron-left" className="w-4 h-4 ml-auto text-slate-400"></i>
          </div>

          <div className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 bg-[#F3F2F1] text-slate-900 rounded-lg text-sm font-medium">
              <i data-lucide="home" className="w-4 h-4"></i>
              Home
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium">
              <i data-lucide="users" className="w-4 h-4"></i>
              Clients
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium">
              <i data-lucide="folder" className="w-4 h-4"></i>
              Projects
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium">
              <i data-lucide="clock" className="w-4 h-4"></i>
              Time tracking
            </a>
          </div>

          <div className="mt-8 mb-2 px-3 text-xs font-semibold text-slate-400 tracking-wider">TOOLS</div>
          <div className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium">
              <i data-lucide="receipt" className="w-4 h-4"></i>
              Invoices
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium">
              <i data-lucide="file-text" className="w-4 h-4"></i>
              Contracts
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium">
              <i data-lucide="circle-dollar-sign" className="w-4 h-4"></i>
              Balance
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium">
              <i data-lucide="trending-up" className="w-4 h-4"></i>
              Accounting
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium">
              <i data-lucide="calculator" className="w-4 h-4"></i>
              Taxes
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#F9F9F8] p-8 overflow-y-auto">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Hello, Leonardo</h2>
              <p className="text-sm text-slate-500 mt-1">What are you working on?</p>
            </div>
            <div className="flex items-center gap-4 flex-1 justify-end">
              <div className="relative w-full max-w-xs hidden md:block">
                <i data-lucide="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"></i>
                <input type="text" placeholder="Search" className="w-full bg-white border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-slate-300" />
              </div>
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"><i data-lucide="tag" className="w-4 h-4"></i></button>
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"><i data-lucide="bell" className="w-4 h-4"></i></button>
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"><i data-lucide="dollar-sign" className="w-4 h-4"></i></button>
              <div className="h-6 w-px bg-slate-200 mx-1"></div>
              <span className="text-sm font-medium text-slate-600">0:00:00</span>
              <button className="bg-slate-900 text-white rounded-full p-2"><i data-lucide="play" className="w-3 h-3 fill-current"></i></button>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#F3F2F0] p-5 rounded-xl border border-transparent hover:border-slate-200 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white p-1.5 rounded-md shadow-sm border border-slate-100">
                  <i data-lucide="briefcase" className="w-3.5 h-3.5 text-slate-600"></i>
                </div>
                <span className="text-xs font-medium text-slate-600">Total projects</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-semibold text-slate-900 tracking-tight">455</span>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">+16.4%</span>
              </div>
            </div>

            <div className="bg-[#F3F2F0] p-5 rounded-xl border border-transparent hover:border-slate-200 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white p-1.5 rounded-md shadow-sm border border-slate-100">
                  <i data-lucide="pen-tool" className="w-3.5 h-3.5 text-slate-600"></i>
                </div>
                <span className="text-xs font-medium text-slate-600">Active projects</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-semibold text-slate-900 tracking-tight">55</span>
                <span className="text-xs font-medium text-red-500 bg-red-50 px-1.5 py-0.5 rounded">-4.8%</span>
              </div>
            </div>

            <div className="bg-[#F3F2F0] p-5 rounded-xl border border-transparent hover:border-slate-200 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white p-1.5 rounded-md shadow-sm border border-slate-100">
                  <i data-lucide="check-square" className="w-3.5 h-3.5 text-slate-600"></i>
                </div>
                <span className="text-xs font-medium text-slate-600">Completed projects</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-semibold text-slate-900 tracking-tight">400</span>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">+12.8%</span>
              </div>
            </div>

            <div className="bg-[#F3F2F0] p-5 rounded-xl border border-transparent hover:border-slate-200 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white p-1.5 rounded-md shadow-sm border border-slate-100">
                  <i data-lucide="clock" className="w-3.5 h-3.5 text-slate-600"></i>
                </div>
                <span className="text-xs font-medium text-slate-600">Total hours worked</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-semibold text-slate-900 tracking-tight">600hrs</span>
                <span className="text-xs font-medium text-red-500 bg-red-50 px-1.5 py-0.5 rounded">-1.2%</span>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chart Area */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-semibold text-slate-900">Earning over time</h3>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-100">
                    Month <i data-lucide="chevron-down" className="w-3 h-3"></i>
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 border border-slate-200 rounded-md">
                    <i data-lucide="download" className="w-3.5 h-3.5"></i>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div> Billable
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-2 h-2 rounded-full bg-slate-200"></div> Non Billable
                </div>
              </div>

              {/* Mock Chart */}
              <div className="flex items-end justify-between h-48 gap-3 w-full px-2">
                <div className="w-full bg-blue-100/50 rounded-t-sm h-[40%] relative group"><div className="absolute bottom-0 w-full bg-blue-200 h-[80%] rounded-t-sm"></div></div>
                <div className="w-full bg-blue-100/50 rounded-t-sm h-[60%] relative group"><div className="absolute bottom-0 w-full bg-blue-200 h-[60%] rounded-t-sm"></div></div>
                <div className="w-full bg-blue-100/50 rounded-t-sm h-[35%] relative group"><div className="absolute bottom-0 w-full bg-blue-200 h-[40%] rounded-t-sm"></div></div>
                <div className="w-full bg-blue-100/50 rounded-t-sm h-[50%] relative group"><div className="absolute bottom-0 w-full bg-blue-200 h-[20%] rounded-t-sm"></div></div>
                <div className="w-full bg-blue-100/50 rounded-t-sm h-[45%] relative group"><div className="absolute bottom-0 w-full bg-blue-200 h-[10%] rounded-t-sm"></div></div>
                <div className="w-full bg-blue-100/50 rounded-t-sm h-[70%] relative group"><div className="absolute bottom-0 w-full bg-blue-200 h-[50%] rounded-t-sm"></div></div>
                <div className="w-full bg-blue-100/50 rounded-t-sm h-[80%] relative group"><div className="absolute bottom-0 w-full bg-blue-400 h-[95%] rounded-t-sm"></div></div>
                <div className="w-full bg-blue-100/50 rounded-t-sm h-[30%] relative group"><div className="absolute bottom-0 w-full bg-blue-200 h-[20%] rounded-t-sm"></div></div>
                <div className="w-full bg-blue-100/50 rounded-t-sm h-[55%] relative group"><div className="absolute bottom-0 w-full bg-blue-200 h-[60%] rounded-t-sm"></div></div>
                <div className="w-full bg-blue-100/50 rounded-t-sm h-[75%] relative group"><div className="absolute bottom-0 w-full bg-blue-200 h-[40%] rounded-t-sm"></div></div>
                <div className="w-full bg-blue-100/50 rounded-t-sm h-[20%] relative group"><div className="absolute bottom-0 w-full bg-blue-200 h-[50%] rounded-t-sm"></div></div>
                <div className="w-full bg-blue-100/50 rounded-t-sm h-[65%] relative group"><div className="absolute bottom-0 w-full bg-blue-200 h-[80%] rounded-t-sm"></div></div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="lg:col-span-1 grid grid-cols-2 gap-4">
              <button className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-start hover:border-slate-300 transition-colors text-left">
                <div className="bg-[#F3F2F0] p-2 rounded-lg mb-3">
                  <i data-lucide="receipt" className="w-4 h-4 text-slate-700"></i>
                </div>
                <span className="text-xs font-medium text-slate-700">Send an invoice</span>
              </button>

              <button className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-start hover:border-slate-300 transition-colors text-left">
                <div className="bg-[#F3F2F0] p-2 rounded-lg mb-3">
                  <i data-lucide="send" className="w-4 h-4 text-slate-700"></i>
                </div>
                <span className="text-xs font-medium text-slate-700">Draft a proposal</span>
              </button>

              <button className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-start hover:border-slate-300 transition-colors text-left">
                <div className="bg-[#F3F2F0] p-2 rounded-lg mb-3">
                  <i data-lucide="file-signature" className="w-4 h-4 text-slate-700"></i>
                </div>
                <span className="text-xs font-medium text-slate-700">Create a contract</span>
              </button>

              <button className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-start hover:border-slate-300 transition-colors text-left">
                <div className="bg-[#F3F2F0] p-2 rounded-lg mb-3">
                  <i data-lucide="clipboard-list" className="w-4 h-4 text-slate-700"></i>
                </div>
                <span className="text-xs font-medium text-slate-700">Add a form</span>
              </button>

              <button className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-start hover:border-slate-300 transition-colors text-left">
                <div className="bg-[#F3F2F0] p-2 rounded-lg mb-3">
                  <i data-lucide="folder-plus" className="w-4 h-4 text-slate-700"></i>
                </div>
              </button>

              <button className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-start hover:border-slate-300 transition-colors text-left">
                <div className="bg-[#F3F2F0] p-2 rounded-lg mb-3">
                  <i data-lucide="file-plus" className="w-4 h-4 text-slate-700"></i>
                </div>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
