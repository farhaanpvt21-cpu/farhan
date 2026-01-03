
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-blue-600 to-blue-800 p-12 flex-col justify-between relative overflow-hidden">
         <div className="relative z-10 flex items-center gap-3">
           <div className="bg-white p-2 rounded-xl">
             <BrainCircuit className="text-blue-600 w-8 h-8" />
           </div>
           <span className="text-2xl font-bold text-white tracking-tight">EduAssist AI</span>
         </div>
         
         <div className="relative z-10 max-w-lg">
           <h1 className="text-5xl font-extrabold text-white leading-tight">Elevate your teaching with AI-powered tools.</h1>
           <p className="text-blue-100 text-xl mt-6 leading-relaxed">Save hours of preparation time. Focus more on your students, let us handle the paperwork.</p>
         </div>

         <div className="relative z-10 flex gap-4">
           {[1, 2, 3].map(i => (
             <div key={i} className="w-12 h-1 bg-white/30 rounded-full"></div>
           ))}
         </div>

         {/* Decorative elements */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
          <div className="md:hidden flex items-center gap-2 mb-8">
             <BrainCircuit className="text-blue-600 w-8 h-8" />
             <span className="text-xl font-bold text-slate-800">EduAssist AI</span>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Educator</h2>
            <p className="text-slate-500 mt-2">Enter your credentials to access your dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">School Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="teacher@school.edu" 
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Forgot Password?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative pt-4">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
             <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-white px-4 text-slate-400 font-bold">New Teacher?</span></div>
          </div>

          <button className="w-full bg-white text-slate-700 font-bold py-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
             <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
             Continue with School ID
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
