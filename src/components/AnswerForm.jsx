import React, { useEffect, useRef, useState } from 'react';
import 'mathlive';

const MathInput = ({ questionNumber, onAnswerChange }) => {
  const mf = useRef(null);
  const [latex, setLatex] = useState('');

  useEffect(() => {
    if (mf.current) {
      // Configure the keyboard and behavior
      mf.current.setOptions({
        virtualKeyboardMode: 'onfocus',
        smartFence: true,
        virtualKeyboards: 'numeric symbols greek',
      });

      // Listen for real-time changes
      const handleInput = (e) => {
        const value = e.target.value;
        setLatex(value);
        onAnswerChange(questionNumber, value);
      };

      // Maintain focus when keyboard is used
      const handleFocus = () => {
        // Ensure this field stays connected to the keyboard
        if (mf.current) {
          mf.current.focus({ preventScroll: true });
        }
      };

      mf.current.addEventListener('input', handleInput);
      mf.current.addEventListener('focus', handleFocus);

      return () => {
        if (mf.current) {
          mf.current.removeEventListener('input', handleInput);
          mf.current.removeEventListener('focus', handleFocus);
        }
      };
    }
  }, [questionNumber, onAnswerChange]);

  return (
    <div className="space-y-2">
      <math-field 
        ref={mf}
        className="w-full border border-slate-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        style={{ minHeight: '60px' }}
      />
      {latex && latex.trim() !== '' && (
        <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-xs text-slate-500 mb-1">Ditt svar:</p>
          <div className="text-lg" dangerouslySetInnerHTML={{ __html: `\\(${latex}\\)` }} />
        </div>
      )}
    </div>
  );
};

const AnswerForm = ({ subject, isFiltersCollapsed, onToggleCollapse }) => {
  const [answers, setAnswers] = useState({});
  const numberOfQuestions = subject === 'MATEMATIK' ? 30 : 20;

  const handleAnswerChange = (questionNumber, latex) => {
    setAnswers(prev => ({
      ...prev,
      [questionNumber]: latex
    }));
  };

  // Load MathJax for rendering the preview
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, [answers]);

  return (
    <div className="h-full flex flex-col bg-white relative">
      {/* Toggle Collapse Button - Fixed Position */}
      <button
        onClick={onToggleCollapse}
        className="absolute top-8 right-6 w-12 h-12 flex items-center justify-center bg-slate-200 hover:bg-slate-300 rounded-xl transition-colors z-50"
        aria-label="Toggle floating island"
        style={{ border: 'none', cursor: 'pointer' }}
      >
        {isFiltersCollapsed ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#334155"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: '24px', height: '24px', display: 'block' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#334155"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: '24px', height: '24px', display: 'block' }}
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        )}
      </button>

      {/* Header with Dynamic Padding */}
      <div className="p-6 pr-20 border-b border-slate-200">
        <div 
          className={`transition-all duration-500 ${isFiltersCollapsed ? 'pt-0' : 'pt-24'}`}
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Svarsformulär</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Skriv in eller använd vår inbyggda tangentbord för matematiska uttryck. 
            Om du tycker att en fråga från <strong>B delen</strong> saknar svar skriver du bara in ett minustecken ("-").
          </p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {Array.from({ length: numberOfQuestions }, (_, i) => i + 1).map((num) => (
          <div key={num} className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              {num}. Svar:
            </label>
            <MathInput 
              questionNumber={num}
              onAnswerChange={handleAnswerChange}
            />
          </div>
        ))}
      </div>
      
      <div className="p-6 border-t border-slate-200">
        <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
          Lämna in
        </button>
      </div>
    </div>
  );
};

export default AnswerForm;