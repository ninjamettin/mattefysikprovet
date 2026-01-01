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
  const [editingPart, setEditingPart] = useState(null);
  const [editValue, setEditValue] = useState('');
  
  const [examManifestUrl, setExamManifestUrl] = useState(null);
  const [solutionManifestUrl, setSolutionManifestUrl] = useState(null);
  
  const [containerWidth, setContainerWidth] = useState(null);
  const containerRef = useRef(null);
  // Toggle slider refs & styles
  const subjectToggleRef = useRef(null);
  const [subjectSliderStyle, setSubjectSliderStyle] = useState({});
  const typeToggleRef = useRef(null);
  const [typeSliderStyle, setTypeSliderStyle] = useState({});

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

  // Position subject slider to match active button
  useEffect(() => {
    const update = () => {
      const container = subjectToggleRef.current;
      if (!container) return;
      const active = container.querySelector(`[data-key="${subject}"]`);
      if (!active) return;
      const rect = active.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      setSubjectSliderStyle({
        width: `${rect.width}px`,
        transform: `translateX(${rect.left - parentRect.left}px)`,
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [subject]);

  // Position type slider to match active button
  useEffect(() => {
    const update = () => {
      const container = typeToggleRef.current;
      if (!container) return;
      const active = container.querySelector(`[data-key="${type}"]`);
      if (!active) return;
      const rect = active.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      setTypeSliderStyle({
        width: `${rect.width}px`,
        transform: `translateX(${rect.left - parentRect.left}px)`,
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [type]);

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
  const years = type === 'VÅRA' 
    ? Array.from({ length: 25 }, (_, i) => i + 1)
    : Array.from({ length: currentYear - 2007 + 1 }, (_, i) => currentYear - i);

  const handleYearSelect = (selectedYear) => {
    setYear(selectedYear);
    setIsYearDropdownOpen(false);
  };

  const incrementYear = () => {
    if (type === 'VÅRA') {
      if (year < 25) setYear(year + 1);
    } else {
      if (year < currentYear) setYear(year + 1);
    }
  };

  const decrementYear = () => {
    if (type === 'VÅRA') {
      if (year > 1) setYear(year - 1);
    } else {
      if (year > 2007) setYear(year - 1);
    }
  };

  const toggleSolutionVisibility = () => {
    setIsSolutionVisible(!isSolutionVisible);
  };

  const resetTimer = () => {
    setRemainingTime(180 * 60);
    setIsTimerRunning(false);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleTimeClick = (part, value) => {
    setIsTimerRunning(false);
    setEditingPart(part);
    setEditValue(value.toString().padStart(2, '0'));
  };

  const handleTimeChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setEditValue(val);
  };

  const saveTime = () => {
    if (!editingPart) return;
    
    const currentHours = Math.floor(remainingTime / 3600);
    const currentMinutes = Math.floor((remainingTime % 3600) / 60);
    const currentSeconds = remainingTime % 60;
    
    const val = parseInt(editValue || '0', 10);
    let newTime = remainingTime;

    if (editingPart === 'hours') {
      newTime = (val * 3600) + (currentMinutes * 60) + currentSeconds;
    } else if (editingPart === 'minutes') {
      newTime = (currentHours * 3600) + (Math.min(59, val) * 60) + currentSeconds;
    } else if (editingPart === 'seconds') {
      newTime = (currentHours * 3600) + (currentMinutes * 60) + Math.min(59, val);
    }

    setRemainingTime(newTime);
    setEditingPart(null);
  };

  const handleTimeBlur = () => {
    saveTime();
  };

  const handleTimeKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveTime();
    }
  };



  // Calculate Manifest URL based on year
  const getManifestUrl = async (manifestType) => {
    let folder;
    let fileNumber;

    if (type === 'VÅRA') {
      folder = manifestType === 'exam' ? `${subject.toLowerCase()}_prov_vara` : `${subject.toLowerCase()}_losningar_vara`;
      fileNumber = year;
    } else {
      folder = manifestType === 'exam' ? `${subject.toLowerCase()}_prov` : `${subject.toLowerCase()}_losningar`;
      fileNumber = year - 2006;
    }

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

  // Lucide DOM replacement removed to allow custom SVG chevrons to display and be styled

  return (
    <div className="h-screen flex flex-col relative bg-slate-50 overflow-hidden select-none print:hidden">
      <style>{`
        .chevron-toggle-btn svg {
          width: 64px !important;
          height: 64px !important;
        }
      `}</style>
      <style>{`
        @media print {
          body {
            display: none !important;
          }
        }
      `}</style>
      
      {/* Container for Floating Island and Collapse Button */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
        {/* Floating Island Filter Bar */}
        <div 
          className={`transition-all duration-500 ease-in-out ${
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
                    disabled={type === 'VÅRA' ? year >= 25 : year >= currentYear}
                    className="w-7 h-4.5 flex items-center justify-center bg-transparent hover:bg-slate-200/50 disabled:opacity-30 transition-colors border-0 border-b border-slate-200/60 p-0 rounded-tr-xl flex-shrink-0"
                    aria-label="Next year"
                  >
                      <ChevronUp className="w-3 h-3 text-slate-700" />
                  </button>
                    <button
                    onClick={decrementYear}
                    disabled={type === 'VÅRA' ? year <= 1 : year <= 2007}
                    className="w-7 h-4.5 flex items-center justify-center bg-transparent hover:bg-slate-200/50 disabled:opacity-30 transition-colors border-0 p-0 rounded-br-xl flex-shrink-0"
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
              <div ref={subjectToggleRef} className="relative inline-flex items-center rounded-xl bg-slate-100/80 p-1 gap-1">
                <div
                  className="absolute top-1 bottom-1 left-0 rounded-lg bg-slate-900 shadow-sm transition-all duration-300 ease-out"
                  style={{ ...subjectSliderStyle }}
                />
                <button
                  data-key="MATEMATIK"
                  onClick={() => setSubject('MATEMATIK')}
                  className={`relative z-10 px-3 py-1.5 text-sm font-bold transition-colors border-0 bg-transparent ${
                    subject === 'MATEMATIK' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  MATEMATIK
                </button>
                <button
                  data-key="FYSIK"
                  onClick={() => setSubject('FYSIK')}
                  className={`relative z-10 px-3 py-1.5 text-sm font-bold transition-colors border-0 bg-transparent ${
                    subject === 'FYSIK' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  FYSIK
                </button>
              </div>

              {/* Type Toggle */}
              <div ref={typeToggleRef} className="relative inline-flex items-center rounded-xl bg-slate-100/80 p-1 gap-1">
                <div
                  className="absolute top-1 bottom-1 left-0 rounded-lg bg-slate-900 shadow-sm transition-all duration-300 ease-out"
                  style={{ ...typeSliderStyle }}
                />
                <button
                  data-key="OFFICIELLA"
                  onClick={() => {
                    setType('OFFICIELLA');
                    setYear(2007);
                  }}
                  className={`relative z-10 px-3 py-1.5 text-sm font-bold transition-colors border-0 bg-transparent ${
                    type === 'OFFICIELLA' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  OFFICIELLA
                </button>
                <button
                  data-key="VÅRA"
                  onClick={() => {
                    setType('VÅRA');
                    setYear(1);
                  }}
                  className={`relative z-10 px-3 py-1.5 text-sm font-bold transition-colors border-0 bg-transparent ${
                    type === 'VÅRA' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  VÅRA
                </button>
              </div>

              <div className="w-px h-8 bg-slate-200/60"></div>

              {/* Eye Toggle (identical design to year dropdown button) */}
              <div>
                <button
                  onClick={() => setIsSolutionVisible((v) => !v)}
                  aria-label="Toggle solutions"
                  className="w-9 h-9 flex items-center justify-center bg-transparent hover:bg-slate-200/50 transition-colors border-0 p-0 rounded-r-xl"
                >
                  {isSolutionVisible ? (
                    <Eye className="w-4 h-4 text-slate-700" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-slate-700" />
                  )}
                </button>
              </div>

              {/* Timer */}
              <div className="flex items-center gap-3 bg-slate-50/50 border border-slate-200/60 rounded-xl pl-4 pr-2 py-1.5">              
                <div className="font-mono font-bold text-slate-900 flex items-center justify-center w-[8ch]">
                  {/* Hours */}
                  {editingPart === 'hours' ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleTimeChange}
                      onBlur={handleTimeBlur}
                      onKeyDown={handleTimeKeyDown}
                      className="w-[2ch] bg-transparent border-b border-slate-900 focus:outline-none text-center p-0"
                      autoFocus
                    />
                  ) : (
                    <span 
                      onClick={() => handleTimeClick('hours', Math.floor(remainingTime / 3600))}
                      className="cursor-pointer hover:bg-slate-200 rounded px-0.5"
                    >
                      {Math.floor(remainingTime / 3600).toString().padStart(2, '0')}
                    </span>
                  )}
                  :
                  {/* Minutes */}
                  {editingPart === 'minutes' ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleTimeChange}
                      onBlur={handleTimeBlur}
                      onKeyDown={handleTimeKeyDown}
                      className="w-[2ch] bg-transparent border-b border-slate-900 focus:outline-none text-center p-0"
                      autoFocus
                    />
                  ) : (
                    <span 
                      onClick={() => handleTimeClick('minutes', Math.floor((remainingTime % 3600) / 60))}
                      className="cursor-pointer hover:bg-slate-200 rounded px-0.5"
                    >
                      {Math.floor((remainingTime % 3600) / 60).toString().padStart(2, '0')}
                    </span>
                  )}
                  :
                  {/* Seconds */}
                  {editingPart === 'seconds' ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleTimeChange}
                      onBlur={handleTimeBlur}
                      onKeyDown={handleTimeKeyDown}
                      className="w-[2ch] bg-transparent border-b border-slate-900 focus:outline-none text-center p-0"
                      autoFocus
                    />
                  ) : (
                    <span 
                      onClick={() => handleTimeClick('seconds', remainingTime % 60)}
                      className="cursor-pointer hover:bg-slate-200 rounded px-0.5"
                    >
                      {(remainingTime % 60).toString().padStart(2, '0')}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={toggleTimer}
                    aria-label={isTimerRunning ? 'Pausa timer' : 'Starta timer'}
                    className="w-7 h-4.5 flex items-center justify-center bg-transparent hover:bg-slate-200/50 disabled:opacity-30 transition-colors border-0 border-b border-slate-200/60 p-0 rounded-tr-xl flex-shrink-0"
                  >
                      {isTimerRunning ? (
                        <Pause className="w-4 h-4 text-slate-700" />
                      ) : (
                        <Play className="w-4 h-4 text-slate-700" />
                      )}
                  </button>

                  <button
                    onClick={resetTimer}
                    aria-label="Reset timer"
                    className="w-7 h-4.5 flex items-center justify-center bg-transparent hover:bg-slate-200/50 disabled:opacity-30 transition-colors border-0 p-0 rounded-br-xl flex-shrink-0"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-700" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Toggle Filters Button (fills button fully) */}
      <button
        onClick={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
        className="w-[50px] h-[50px] absolute top-[30px] right-[50px] z-40 flex items-center justify-center bg-gray-100 hover:bg-slate-300/60"
        aria-label="Toggle filters"
      >
        {isFiltersCollapsed ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full text-slate-700"
          >
            {/* scaled polyline to almost fill button */}
            <polyline points="2 8 12 18 22 8" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full text-slate-700"
          >
            <polyline points="22 16 12 6 2 16" />
          </svg>
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
