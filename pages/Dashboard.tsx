
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  ArrowRight, 
  Clock, 
  Sparkles,
  FileText,
  HelpCircle,
  StickyNote,
  Home,
  MessageSquare,
  UserCheck
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const tools = [
    { title: 'Attendance', desc: 'Track daily presence and analyze trends', icon: UserCheck, path: '/tools/attendance', color: 'bg-indigo-50 text-indigo-600' },
    { title: 'Lesson Plan', desc: 'Generate structured pedagogical plans', icon: FileText, path: '/tools/lesson-plan', color: 'bg-blue-50 text-blue-600' },
    { title: 'Question Paper', desc: 'Create exams with varying difficulty', icon: HelpCircle, path: '/tools/question-paper', color: 'bg-purple-50 text-purple-600' },
    { title: 'Study Notes', desc: 'Concise summaries and key points', icon: StickyNote, path: '/tools/notes', color: 'bg-emerald-50 text-emerald-600' },
    { title: 'Homework', desc: 'Daily assignments and practice sets', icon: Home, path: '/tools/homework', color: 'bg-orange-50 text-orange-600' },
    { title: 'Feedback', desc: 'Professional student performance reviews', icon: MessageSquare, path: '/tools/feedback', color: 'bg-pink-50 text-pink-600' },
  ];

  const recentActivity = [
    { id: 1, title: 'Class 10-A Attendance', date: '10 mins ago', type: 'Attendance' },
    { id: 2, title: 'Calculus Lesson Plan', date: '2 hours ago', type: 'Lesson Plan' },
    { id: 3, title: 'Mid-term Physics Exam', date: 'Yesterday', type: 'Question Paper' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, Sarah! 👋</h1>
          <p className="text-slate-500 mt-1">What would you like to build for your class today?</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
          <Plus className="w-5 h-5" />
          Quick Draft
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Link 
              key={tool.title} 
              to={tool.path}
              className="group glass-card p-6 rounded-2xl hover:shadow-xl hover:shadow-slate-200/50 transition-all border border-slate-100 flex flex-col"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${tool.color}`}>
                <tool.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{tool.title}</h3>
              <p className="text-slate-500 text-sm mt-1 leading-relaxed">{tool.desc}</p>
              <div className="mt-auto pt-4 flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                Get Started <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                Recent Activity
              </h3>
              <button className="text-xs text-blue-600 font-medium hover:underline">View all</button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 group cursor-pointer p-2 -m-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate group-hover:text-blue-600 transition-colors">{activity.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">{activity.type}</span>
                      <span className="text-xs text-slate-400">{activity.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl text-white relative overflow-hidden shadow-xl shadow-blue-500/20">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-white/20 p-1.5 rounded-lg">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-bold tracking-wider uppercase">Pro Feature</span>
              </div>
              <h3 className="text-lg font-bold mb-2 leading-tight">Automate Weekly Assessments</h3>
              <p className="text-blue-100 text-sm mb-4 leading-relaxed">Let AI create a full week of quizzes based on your current syllabus.</p>
              <button className="w-full bg-white text-blue-700 font-bold py-2 rounded-xl text-sm hover:bg-blue-50 transition-colors">
                Upgrade to Pro
              </button>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
