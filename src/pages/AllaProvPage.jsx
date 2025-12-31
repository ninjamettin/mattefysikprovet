import { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, List, Eye, EyeOff, Play, Pause, RotateCcw } from 'lucide-react';
import DeepZoomViewer from '../components/DeepZoomViewer';

const AllaProvPage = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(2007); // Default to 2007 where we know we have files
  const [subject, setSubject] = useState('MATEMATIK');
  const [type, setType] = useState('OFFICIELLA');
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false);
  const [isSolutionVisible, setIsSolutionVisible] = useState(true);
  const [timerMinutes, setTimerMinutes] = useState(180); // 3 hours in minutes
  const [remainingTime, setRemainingTime] = useState(180 * 60); // in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  const [examManifestUrl, setExamManifestUrl] = useState(null);
  const [solutionManifestUrl, setSolutionManifestUrl] = useState(null);
  
  const [containerWidth, setContainerWidth] = useState(null);
  const containerRef = useRef(null);

  // Measure container width
  useEffect(() => {
    if (!containerRef.current) return;
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Security: Disable right-click and keyboard shortcuts
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      // Disable Save (Ctrl+S / Cmd+S) and Print (Ctrl+P / Cmd+P)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p')) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Timer countdown effect
  useEffect(() => {
    let interval;
    if (isTimerRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, remainingTime]);

  // Update timer when subject changes
  useEffect(() => {
    const defaultMinutes = subject === 'MATEMATIK' ? 180 : 120;
    setTimerMinutes(defaultMinutes);
    setRemainingTime(defaultMinutes * 60);
    setIsTimerRunning(false);
  }, [subject]);

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

  const toggleSolutionVisibility = () => {
    setIsSolutionVisible(!isSolutionVisible);
  };

  const handleTimerInputChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setTimerMinutes(value);
    setRemainingTime(value * 60);
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    const defaultMinutes = subject === 'MATEMATIK' ? 180 : 120;
    setTimerMinutes(defaultMinutes);
    setRemainingTime(defaultMinutes * 60);
    setIsTimerRunning(false);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate Manifest URL based on year
  const getManifestUrl = async (type) => {
    const folder = type === 'exam' ? `${subject.toLowerCase()}_prov` : `${subject.toLowerCase()}_losningar`;
    const fileNumber = year - 2006;
    const url = `/tiles/${folder}/${fileNumber}/manifest.json`;
    
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok ? url : null;
    } catch {
      return null;
    }
  };

  // Update manifest URLs when selection changes
  useEffect(() => {
    const updateUrls = async () => {
      const examUrl = await getManifestUrl('exam');
      const solutionUrl = await getManifestUrl('solution');
      setExamManifestUrl(examUrl);
      setSolutionManifestUrl(solutionUrl);
    };
    updateUrls();
  }, [year, subject, type]);

  return (
    <div className="h-screen flex flex-col relative bg-slate-50 overflow-hidden select-none print:hidden">
      <style>{`
        @media print {
          body {
            display: none !important;
          }
        }
      `}</style>
      
      {/* Floating Island Filter Bar */}
      <div 
        className={`absolute top-6 left-1/2 -translate-x-1/2 z-30 transition-all duration-500 ease-in-out ${
          isFiltersCollapsed ? '-translate-y-[200%] opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="bg-white/90 backdrop-blur-md rounded-2xl px-8 py-3 shadow-2xl border border-white/20">
          <div className="flex items-center gap-6">
            {/* Year Selector */}
            <div className="flex items-center bg-slate-50/50 border border-slate-200/60 rounded-xl overflow-visible">
              {/* Year Display */}
              <div className="w-16 h-9 px-2 flex items-center justify-center font-bold text-slate-900">
                {year}
              </div>
              
              {/* Up/Down Buttons */}
              <div className="flex flex-col border-l border-slate-200/60">
                <button
                  onClick={incrementYear}
                  disabled={year >= currentYear}
                  className="w-7 h-4.5 flex items-center justify-center bg-transparent hover:bg-slate-200/50 disabled:opacity-30 transition-colors border-0 border-b border-slate-200/60 p-0 rounded-tr-xl"
                  aria-label="Next year"
                >
                  <ChevronUp className="w-3 h-3 text-slate-700" />
                </button>
                <button
                  onClick={decrementYear}
                  disabled={year <= 2007}
                  className="w-7 h-4.5 flex items-center justify-center bg-transparent hover:bg-slate-200/50 disabled:opacity-30 transition-colors border-0 p-0 rounded-br-xl"
                  aria-label="Previous year"
                >
                  <ChevronDown className="w-3 h-3 text-slate-700" />
                </button>
              </div>
              
              {/* Dropdown Button */}
              <div className="relative border-l border-slate-200/60">
                <button
                  onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                  className="w-9 h-9 flex items-center justify-center bg-transparent hover:bg-slate-200/50 transition-colors border-0 p-0 rounded-r-xl"
                  aria-label="Select year"
                >
                  <List className="w-4 h-4 text-slate-700" />
                </button>
                
                {isYearDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsYearDropdownOpen(false)}
                    ></div>
                    <div 
                      className="absolute z-20 mt-4 left-1/2 -translate-x-1/2 w-32 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl max-h-64 overflow-y-auto border border-white/20"
                      style={{ scrollbarWidth: 'none' }}
                    >
                      {years.map((y) => (
                        <button
                          key={y}
                          onClick={() => handleYearSelect(y)}
                          className={`w-full px-4 py-2 text-center font-medium transition-colors border-0 bg-transparent ${
                            y === year ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
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
            <div className="relative grid grid-cols-2 rounded-xl bg-slate-100/80 p-1 gap-1 w-56">
              <div
                className="absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-lg bg-slate-900 shadow-sm transition-transform duration-300 ease-out"
                style={{
                  transform: subject === 'MATEMATIK' ? 'translateX(0)' : 'translateX(calc(100% + 0.25rem))',
                }}
              />
              <button
                onClick={() => setSubject('MATEMATIK')}
                className={`relative z-10 py-1.5 text-sm font-bold transition-colors border-0 bg-transparent ${
                  subject === 'MATEMATIK' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                MATEMATIK
              </button>
              <button
                onClick={() => setSubject('FYSIK')}
                className={`relative z-10 py-1.5 text-sm font-bold transition-colors border-0 bg-transparent ${
                  subject === 'FYSIK' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                FYSIK
              </button>
            </div>

            {/* Type Toggle */}
            <div className="relative grid grid-cols-2 rounded-xl bg-slate-100/80 p-1 gap-1 w-48">
              <div
                className="absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-lg bg-slate-900 shadow-sm transition-transform duration-300 ease-out"
                style={{
                  transform: type === 'OFFICIELLA' ? 'translateX(0)' : 'translateX(calc(100% + 0.25rem))',
                }}
              />
              <button
                onClick={() => setType('OFFICIELLA')}
                className={`relative z-10 py-1.5 text-sm font-bold transition-colors border-0 bg-transparent ${
                  type === 'OFFICIELLA' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                OFFICIELLA
              </button>
              <button
                onClick={() => setType('VÅRA')}
                className={`relative z-10 py-1.5 text-sm font-bold transition-colors border-0 bg-transparent ${
                  type === 'VÅRA' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                VÅRA
              </button>
            </div>

            <div className="w-px h-8 bg-slate-200/60"></div>

            {/* Eye Toggle */}
            <button
              onClick={toggleSolutionVisibility}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50/50 border border-slate-200/60 hover:bg-slate-100 transition-colors"
            >
              {isSolutionVisible ? (
                <Eye className="w-5 h-5 text-slate-700" />
              ) : (
                <EyeOff className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* Timer */}
            <div className="flex items-center gap-3 bg-slate-50/50 border border-slate-200/60 rounded-xl pl-4 pr-2 py-1.5">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={timerMinutes}
                  onChange={handleTimerInputChange}
                  className="w-12 bg-transparent text-center font-bold text-slate-900 focus:outline-none border-b border-transparent focus:border-emerald-500 transition-colors"
                  min="0"
                  disabled={isTimerRunning}
                />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">min</span>
              </div>
              
              <div className="w-px h-6 bg-slate-200/60"></div>
              
              <div className="font-mono font-bold text-slate-900 w-[4.5ch]">
                {formatTime(remainingTime)}
              </div>

              <div className="flex gap-1">
                <button
                  onClick={toggleTimer}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-slate-50 border border-slate-200/60 transition-colors"
                >
                  {isTimerRunning ? (
                    <Pause className="w-3.5 h-3.5 text-slate-700 ml-0.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-slate-700 ml-0.5" />
                  )}
                </button>

                <button
                  onClick={resetTimer}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-slate-50 border border-slate-200/60 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Filters Button */}
      <button
        onClick={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
        className="absolute top-6 right-6 z-40 w-10 h-10 flex items-center justify-center rounded-xl bg-white/90 backdrop-blur-md text-slate-900 hover:bg-white shadow-lg border border-white/20 transition-all hover:scale-105"
      >
        {isFiltersCollapsed ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronUp className="w-5 h-5" />
        )}
      </button>

      {/* PDF Viewer Section */}
      <div className="flex-1 grid grid-cols-2 h-full">
        {/* Exam PDF */}
        <div className="bg-white border-r border-slate-200 overflow-hidden flex flex-col h-full">
          <div 
            ref={containerRef}
            className="flex-1 relative bg-slate-100 overflow-hidden"
          >
            {examManifestUrl ? (
              <DeepZoomViewer manifestUrl={examManifestUrl} width={containerWidth} />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                Inget prov tillgängligt för detta år
              </div>
            )}
          </div>
        </div>

        {/* Solution PDF */}
        <div className="bg-white overflow-hidden flex flex-col h-full">
          <div className="flex-1 relative bg-slate-100 overflow-hidden">
            <div className={`h-full transition-all duration-300 ${isSolutionVisible ? 'blur-none' : 'blur-xl'}`}>
              {solutionManifestUrl ? (
                <DeepZoomViewer manifestUrl={solutionManifestUrl} width={containerWidth} />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  Inga lösningar tillgängliga för detta år
                </div>
              )}
            </div>
            
            {!isSolutionVisible && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="bg-slate-900/90 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold shadow-2xl border border-white/10 transform scale-110">
                  Lösningar dolda
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllaProvPage;
