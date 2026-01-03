
import React, { useState } from 'react';
import { generateContent, QuestionPaperSchema } from '../../services/geminiService';
import { QuestionPaperOutput } from '../../types';
import { 
  Sparkles, 
  Printer, 
  Download, 
  RotateCcw, 
  Loader2, 
  CheckCircle2, 
  FileText,
  BadgeInfo,
  Layers,
  BarChart3
} from 'lucide-react';

const QuestionPaper: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    topic: '',
    difficulty: 'Medium',
    totalMarks: '50',
    type: 'Mixed'
  });
  const [result, setResult] = useState<QuestionPaperOutput | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const prompt = `Create a question paper for ${formData.subject}, Grade ${formData.grade}, focusing on "${formData.topic}". Total marks: ${formData.totalMarks}. Difficulty level: ${formData.difficulty}. Question type preference: ${formData.type}. Format as JSON with fields: title, instructions, and questions (array of objects with number, text, marks, type).`;
      
      const response = await generateContent(prompt, QuestionPaperSchema);
      const parsed = JSON.parse(response || '{}');
      setResult(parsed);
    } catch (error) {
      console.error(error);
      alert("Error creating paper. Ensure your API Key is valid and selected.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Question Paper Generator</h1>
          <p className="text-slate-500 mt-1">Generate comprehensive exams and quizzes instantly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <form onSubmit={handleGenerate} className="glass-card p-6 rounded-2xl border border-slate-100 space-y-5 sticky top-24 no-print">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
              <input 
                type="text" required
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                placeholder="e.g. Physics" 
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Grade</label>
                <input 
                  type="text" required
                  value={formData.grade}
                  onChange={e => setFormData({...formData, grade: e.target.value})}
                  placeholder="e.g. 12th" 
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Total Marks</label>
                <input 
                  type="number" required
                  value={formData.totalMarks}
                  onChange={e => setFormData({...formData, totalMarks: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Topic/Syllabus</label>
              <textarea 
                required
                value={formData.topic}
                onChange={e => setFormData({...formData, topic: e.target.value})}
                rows={2}
                placeholder="List topics or focus area..." 
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Difficulty</label>
              <div className="flex gap-2">
                {['Easy', 'Medium', 'Hard'].map(d => (
                  <button
                    key={d} type="button"
                    onClick={() => setFormData({...formData, difficulty: d})}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border ${
                      formData.difficulty === d 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <button 
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-70 active:scale-[0.98]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              {loading ? 'Generating Paper...' : 'Generate Questions'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          {!result && !loading && (
            <div className="h-[400px] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-200 rounded-2xl bg-white/50">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="font-bold text-slate-900">Exam Preview Area</h3>
              <p className="text-slate-500 text-sm mt-1">The generated paper will appear here for you to print or download.</p>
            </div>
          )}

          {loading && (
            <div className="glass-card p-12 rounded-2xl border border-slate-100 flex flex-col items-center justify-center space-y-4">
               <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
               <p className="text-slate-600 font-medium animate-pulse">Our AI is drafting complex questions for you...</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6">
              <div className="flex items-center justify-between no-print bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                <div className="flex gap-2">
                   <button onClick={handleGenerate} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                     <RotateCcw className="w-5 h-5" />
                   </button>
                </div>
                <div className="flex gap-2">
                   <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-900">
                     <Printer className="w-4 h-4" /> Print
                   </button>
                   <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md">
                     <Download className="w-4 h-4" /> Download DOCX
                   </button>
                </div>
              </div>

              <div className="bg-white p-8 sm:p-12 shadow-xl border border-slate-100 rounded-lg min-h-[800px] text-slate-900 font-serif printable-paper">
                <div className="text-center space-y-2 mb-12 border-b-2 border-slate-900 pb-8">
                  <h2 className="text-2xl font-bold uppercase tracking-widest">{result.title || `${formData.subject} Examination`}</h2>
                  <div className="flex justify-between items-end pt-4 font-sans text-sm font-bold">
                    <p>Class: {formData.grade}</p>
                    <p>Time Allowed: 3 Hours</p>
                    <p>Total Marks: {formData.totalMarks}</p>
                  </div>
                </div>

                <div className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-lg font-sans text-sm italic no-print">
                   <BadgeInfo className="w-4 h-4 text-blue-600 mb-1" />
                   <strong>Instructions:</strong> {result.instructions}
                </div>

                <div className="space-y-10">
                  {result.questions?.map((q, idx) => (
                    <div key={idx} className="flex group">
                      <div className="w-8 font-bold text-lg">{q.number}.</div>
                      <div className="flex-1">
                        <p className="text-lg leading-relaxed mb-4">{q.text}</p>
                        <div className="h-px bg-slate-100 w-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity no-print"></div>
                        <div className="flex justify-between items-center no-print">
                           <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-sans font-bold uppercase">{q.type}</span>
                        </div>
                      </div>
                      <div className="w-12 text-right font-bold italic">[{q.marks}]</div>
                    </div>
                  ))}
                </div>

                <div className="mt-20 pt-8 border-t border-slate-200 text-center text-xs text-slate-400 font-sans uppercase tracking-[0.2em]">
                   End of Question Paper
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .printable-paper { box-shadow: none !important; border: none !important; padding: 0 !important; }
          body { background: white !important; }
          aside, header { display: none !important; }
          main { margin: 0 !important; padding: 0 !important; width: 100% !important; max-width: none !important; }
        }
      `}</style>
    </div>
  );
};

export default QuestionPaper;
