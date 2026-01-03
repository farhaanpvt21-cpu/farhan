
import React, { useState } from 'react';
import { generateContent, LessonPlanSchema } from '../../services/geminiService';
import { LessonPlanOutput } from '../../types';
// Fix: Add missing FileText import from lucide-react
import { 
  Sparkles, 
  Copy, 
  Download, 
  RotateCcw, 
  Loader2, 
  CheckCircle2, 
  Lightbulb, 
  Users, 
  BookOpen, 
  Target,
  FileText
} from 'lucide-react';

const LessonPlan: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    topic: '',
    duration: '45 mins',
    learningStyle: 'Interactive'
  });
  const [result, setResult] = useState<LessonPlanOutput | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const prompt = `Generate a structured lesson plan for ${formData.subject}, Grade ${formData.grade}, on the topic "${formData.topic}". The duration is ${formData.duration}. Teaching style should be ${formData.learningStyle}. Format it as JSON with fields: objectives (array), activities (array), teachingMethod (string), and assessment (string).`;
      
      const response = await generateContent(prompt, LessonPlanSchema);
      // Ensure we handle potential undefined response from text extraction
      const parsed = JSON.parse(response || '{}');
      setResult(parsed);
    } catch (error) {
      console.error(error);
      alert("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `
LESSON PLAN: ${formData.topic} (${formData.subject} - Grade ${formData.grade})

OBJECTIVES:
${result.objectives.map(o => `- ${o}`).join('\n')}

ACTIVITIES:
${result.activities.map(a => `- ${a}`).join('\n')}

TEACHING METHOD:
${result.teachingMethod}

ASSESSMENT:
${result.assessment}
    `.trim();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lesson Plan Generator</h1>
          <p className="text-slate-500 mt-1">Design engaging lessons in seconds with AI support.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <form onSubmit={handleGenerate} className="glass-card p-6 rounded-2xl border border-slate-100 space-y-5 sticky top-24">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
              <input 
                type="text" 
                required
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                placeholder="e.g. Mathematics" 
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Grade/Level</label>
                <input 
                  type="text" 
                  required
                  value={formData.grade}
                  onChange={e => setFormData({...formData, grade: e.target.value})}
                  placeholder="e.g. 10th" 
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Duration</label>
                <select 
                  value={formData.duration}
                  onChange={e => setFormData({...formData, duration: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                >
                  <option>30 mins</option>
                  <option>45 mins</option>
                  <option>60 mins</option>
                  <option>90 mins</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Topic</label>
              <input 
                type="text" 
                required
                value={formData.topic}
                onChange={e => setFormData({...formData, topic: e.target.value})}
                placeholder="e.g. Introduction to Calculus" 
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Teaching Style</label>
              <div className="grid grid-cols-1 gap-2">
                {['Interactive', 'Lecture-based', 'Collaborative', 'Practical'].map(style => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setFormData({...formData, learningStyle: style})}
                    className={`text-left px-4 py-2 rounded-lg text-sm transition-all border ${
                      formData.learningStyle === style 
                        ? 'bg-blue-600 border-blue-600 text-white font-medium' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
            <button 
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Lesson Plan
                </>
              )}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          {!result && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
                <FileText className="w-12 h-12 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Content Generated Yet</h3>
              <p className="text-slate-500 max-w-xs mt-2">Fill in the form on the left to create your customized lesson plan.</p>
            </div>
          )}

          {loading && (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-card p-6 rounded-2xl border border-slate-100 animate-pulse">
                  <div className="h-6 w-1/3 bg-slate-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-slate-100 rounded"></div>
                    <div className="h-4 w-5/6 bg-slate-100 rounded"></div>
                    <div className="h-4 w-4/6 bg-slate-100 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-4">
                  <button onClick={handleGenerate} className="p-2 text-slate-400 hover:text-blue-600 transition-colors" title="Regenerate">
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <div className="h-4 w-[1px] bg-slate-200"></div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">AI Generated Result</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-all"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all shadow-sm">
                    <Download className="w-4 h-4" />
                    Export PDF
                  </button>
                </div>
              </div>

              {/* Objectives Section */}
              <div className="glass-card p-8 rounded-2xl border border-slate-100 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Learning Objectives</h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span className="text-sm leading-relaxed">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Activities Section */}
              <div className="glass-card p-8 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-emerald-50 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Classroom Activities</h3>
                </div>
                <div className="space-y-4">
                  {result.activities.map((act, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-emerald-50/10 hover:bg-emerald-50/20 transition-colors">
                       <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                       <p className="text-slate-700 text-sm leading-relaxed">{act}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teaching Method & Assessment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-8 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-purple-50 p-2 rounded-lg">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Methodology</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed italic border-l-4 border-purple-200 pl-4">
                    {result.teachingMethod}
                  </p>
                </div>
                <div className="glass-card p-8 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-orange-50 p-2 rounded-lg">
                      <Lightbulb className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Assessment</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {result.assessment}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPlan;
