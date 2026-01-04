import { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, List, Play, Pause, RotateCcw, FileText, ChevronRight, X, Info, Video } from 'lucide-react';
import DeepZoomViewer from '../components/DeepZoomViewer';
import AnswerForm from '../components/AnswerForm';

const TestaDigSjalvPage = () => {
  const currentYear = new Date().getFullYear();
  const [selectedExam, setSelectedExam] = useState(null);
  const [year, setYear] = useState(2007); // Default to 2007 where we know we have files
  const [subject, setSubject] = useState('MATEMATIK');
  const [type, setType] = useState('OFFICIELLA');
  const [selectionType, setSelectionType] = useState('OFFICIELLA'); // For the selection screen
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(180); // 3 hours in minutes
  const [remainingTime, setRemainingTime] = useState(180 * 60); // in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [editingPart, setEditingPart] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  
  const [examManifestUrl, setExamManifestUrl] = useState(null);
  
  const [containerWidth, setContainerWidth] = useState(null);
  const containerRef = useRef(null);
  // Toggle slider refs & styles
  const subjectToggleRef = useRef(null);
  const [subjectSliderStyle, setSubjectSliderStyle] = useState({});
  const typeToggleRef = useRef(null);
  const [typeSliderStyle, setTypeSliderStyle] = useState({});
  const selectionTypeToggleRef = useRef(null);
  const [selectionTypeSliderStyle, setSelectionTypeSliderStyle] = useState({});

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
  }, [subject, selectedExam]);

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
  }, [type, selectedExam]);

  // Position selection type slider
  useEffect(() => {
    const update = () => {
      const container = selectionTypeToggleRef.current;
      if (!container) return;
      const active = container.querySelector(`[data-key="${selectionType}"]`);
      if (!active) return;
      const rect = active.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      setSelectionTypeSliderStyle({
        width: `${rect.width}px`,
        transform: `translateX(${rect.left - parentRect.left}px)`,
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [selectionType, selectedExam]);

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

  // Generate selection years based on selectionType
  const selectionYears = selectionType === 'VÅRA'
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
      setExamManifestUrl(examUrl);
    };
    updateUrls();
  }, [year, subject, type]);

  // Lucide DOM replacement removed to allow custom SVG chevrons to display and be styled

  const handleExamSelect = (selectedYear, selectedSubject) => {
    setYear(selectedYear);
    setSubject(selectedSubject);
    setType(selectionType);
    setSelectedExam({ year: selectedYear, subject: selectedSubject, type: selectionType });
  };

  const handleExit = () => {
    setSelectedExam(null);
    setShowExitConfirm(false);
    setRemainingTime(180 * 60);
    setIsTimerRunning(false);
  };

  const handleSubmit = () => {
    setSelectedExam(null);
    setShowSubmitConfirm(false);
    setRemainingTime(180 * 60);
    setIsTimerRunning(false);
  };

  if (!selectedExam) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 px-4 pb-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-slate-900">Välj Provet Du Vill Testa Dig På</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Dina resultat kommer att bearbetas i 'Statistik' fliken för att se vilka ämnen du behöver öva på
            </p>
          </div>

          {/* Type Toggle */}
          <div className="flex justify-center">
            <div ref={selectionTypeToggleRef} className="relative inline-flex items-center rounded-xl bg-white p-1 gap-1 shadow-sm border border-slate-200">
              <div
                className="absolute top-1 bottom-1 left-0 rounded-lg bg-slate-900 shadow-sm transition-all duration-300 ease-out"
                style={{ ...selectionTypeSliderStyle }}
              />
              <button
                data-key="OFFICIELLA"
                onClick={() => setSelectionType('OFFICIELLA')}
                className={`relative z-10 px-6 py-2 text-sm font-bold transition-colors border-0 bg-transparent ${
                  selectionType === 'OFFICIELLA' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                OFFICIELLA
              </button>
              <button
                data-key="VÅRA"
                onClick={() => setSelectionType('VÅRA')}
                className={`relative z-10 px-6 py-2 text-sm font-bold transition-colors border-0 bg-transparent ${
                  selectionType === 'VÅRA' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                VÅRA
              </button>
            </div>
          </div>

          {/* Exam Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectionYears.map((y) => (
              <div key={y} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {selectionType === 'OFFICIELLA' ? `Prov från ${y}` : `Prov ${y}`}
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleExamSelect(y, 'MATEMATIK')}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors group border border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                      <span className="font-medium text-slate-700 group-hover:text-slate-900">Matematik Prov</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500" />
                  </button>
                  <button
                    onClick={() => handleExamSelect(y, 'FYSIK')}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors group border border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                      <span className="font-medium text-slate-700 group-hover:text-slate-900">Fysik Prov</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
              {/* Exit Button */}
              <button
                onClick={() => setShowExitConfirm(true)}
                className="w-9 h-9 flex items-center justify-center bg-transparent hover:bg-slate-200/50 transition-colors border-0 p-0 rounded-xl"
                aria-label="Avsluta prov"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>

              <div className="w-px h-8 bg-slate-200/60"></div>

              {/* Exam Title */}
              <div className="font-bold text-slate-900 text-lg whitespace-nowrap">
                {year} {subject.charAt(0) + subject.slice(1).toLowerCase()} Del
              </div>

              {/* Info Button */}
              <button
                className="w-9 h-9 flex items-center justify-center bg-transparent hover:bg-slate-200/50 transition-colors border-0 p-0 rounded-xl"
                aria-label="Information"
              >
                <Info className="w-4 h-4 text-slate-700" />
              </button>

              {/* Video Button */}
              <button
                className="w-9 h-9 flex items-center justify-center bg-transparent hover:bg-slate-200/50 transition-colors border-0 p-0 rounded-xl"
                aria-label="Video"
              >
                <Video className="w-4 h-4 text-slate-700" />
              </button>

              <div className="w-px h-8 bg-slate-200/60"></div>

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

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Är du säker att du vill avsluta ditt prov?</h3>
            <p className="text-slate-600 mb-6">
              Du kan lämna in en delvis prov genom att trycka på "Lämna in" i svarsformuläret. Då kommer endast svarade frågor att räknas åt din Statistik. 
              Om du vill radera och slänga all data från detta prov kan du trycka på 'Avsluta och Ta Bort'.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 px-4 py-2.5 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Avbryt
              </button>
              <button
                onClick={handleExit}
                className="flex-1 px-4 py-2.5 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors"
              >
                Avsluta och Ta Bort
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Är du säker på att du vill lämna in?</h3>
            <p className="text-slate-600 mb-6">
              Endast svarade frågor kommer att räknas åt din statistik.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 px-4 py-2.5 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Avbryt
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2.5 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
              >
                Lämna in
              </button>
            </div>
          </div>
        </div>
      )}

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

        {/* Answer Form */}
        <div className="bg-white overflow-hidden flex flex-col h-full">
          <AnswerForm 
            subject={subject} 
            isFiltersCollapsed={isFiltersCollapsed}
            onToggleCollapse={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
            onSubmit={() => setShowSubmitConfirm(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default TestaDigSjalvPage;
