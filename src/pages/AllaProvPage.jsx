import { useState } from 'react';

const AllaProvPage = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [subject, setSubject] = useState('MATEMATIK');
  const [type, setType] = useState('OFFICIELLA');
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  // Generate array of years from 2007 to current year
  const years = Array.from({ length: currentYear - 2007 + 1 }, (_, i) => currentYear - i);

  const handleYearSelect = (selectedYear) => {
    setYear(selectedYear);
    setIsYearDropdownOpen(false);
  };

  const incrementYear = () => {
    if (year < currentYear) {
      setYear(year + 1);
    }
  };

  const decrementYear = () => {
    if (year > 2007) {
      setYear(year - 1);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Alla Prov</h1>
      
      {/* Filters Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
        <div className="flex flex-wrap items-center gap-6">
          {/* Year Selector */}
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
            {/* Year Display */}
            <div className="w-20 h-10 px-3 flex items-center justify-center font-semibold text-slate-900">
              {year}
            </div>
            
            {/* Up/Down Buttons */}
            <div className="flex flex-col">
              <button
                onClick={incrementYear}
                disabled={year >= currentYear}
                className="w-8 h-5 flex items-center justify-center bg-transparent hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-0 p-0"
                aria-label="Next year"
              >
                <i data-lucide="chevron-up" className="w-4 h-4 text-slate-700"></i>
              </button>
              <button
                onClick={decrementYear}
                disabled={year <= 2007}
                className="w-8 h-5 flex items-center justify-center bg-transparent hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-0 p-0"
                aria-label="Previous year"
              >
                <i data-lucide="chevron-down" className="w-4 h-4 text-slate-700"></i>
              </button>
            </div>
            
            {/* Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                className="w-10 h-10 flex items-center justify-center bg-transparent hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors border-0 p-0"
                aria-label="Select year from list"
              >
                <i data-lucide="list" className="w-5 h-5 text-slate-700"></i>
              </button>
              
              {isYearDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsYearDropdownOpen(false)}
                  ></div>
                  <div className="absolute z-20 mt-2 w-32 bg-white border border-slate-200 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                    {years.map((y) => (
                      <button
                        key={y}
                        onClick={() => handleYearSelect(y)}
                        className={`w-full px-4 py-2.5 text-left font-medium transition-colors border-0 bg-transparent ${
                          y === year
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Subject Toggle */}
          <div className="relative flex rounded-lg bg-slate-100 p-1 gap-1">
            {/* Animated slider */}
            <div
              className="absolute top-1 bottom-1 left-1 w-[calc(50%-0.125rem)] rounded-md bg-slate-900 transition-transform duration-300 ease-out"
              style={{
                transform: subject === 'MATEMATIK' ? 'translateX(0)' : 'translateX(calc(100% + 0.25rem))',
              }}
            />
            
            <button
              onClick={() => setSubject('MATEMATIK')}
              className={`relative z-10 flex flex-1 items-center justify-center py-2 font-medium transition-colors border-0 bg-transparent ${
                subject === 'MATEMATIK'
                  ? 'text-white'
                  : 'text-slate-500 hover:text-slate-600'
              }`}
            >
              MATEMATIK
            </button>

            <button
              onClick={() => setSubject('FYSIK')}
              className={`relative z-10 flex flex-1 items-center justify-center py-2 font-medium transition-colors border-0 bg-transparent ${
                subject === 'FYSIK'
                  ? 'text-white'
                  : 'text-slate-500 hover:text-slate-600'
              }`}
            >
              FYSIK
            </button>
          </div>

          {/* Type Toggle */}
          <div className="relative flex rounded-lg bg-slate-100 p-1 gap-1">
            {/* Animated slider */}
            <div
              className="absolute top-1 bottom-1 left-1 w-[calc(50%-0.125rem)] rounded-md bg-slate-900 transition-transform duration-300 ease-out"
              style={{
                transform: type === 'OFFICIELLA' ? 'translateX(0)' : 'translateX(calc(100% + 0.25rem))',
              }}
            />
            
            <button
              onClick={() => setType('OFFICIELLA')}
              className={`relative z-10 flex flex-1 items-center justify-center py-2 font-medium transition-colors border-0 bg-transparent ${
                type === 'OFFICIELLA'
                  ? 'text-white'
                  : 'text-slate-500 hover:text-slate-600'
              }`}
            >
              OFFICIELLA
            </button>

            <button
              onClick={() => setType('VÅRA')}
              className={`relative z-10 flex flex-1 items-center justify-center py-2 font-medium transition-colors border-0 bg-transparent ${
                type === 'VÅRA'
                  ? 'text-white'
                  : 'text-slate-500 hover:text-slate-600'
              }`}
            >
              VÅRA
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
        <p className="text-slate-600">
          Visar {type.toLowerCase()} {subject.toLowerCase()} prov från {year}
        </p>
        {/* Add exam list here */}
      </div>
    </div>
  );
};

export default AllaProvPage;
