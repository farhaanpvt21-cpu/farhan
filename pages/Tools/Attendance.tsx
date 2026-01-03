
import React, { useState } from 'react';
import { generateContent, AttendanceInsightSchema } from '../../services/geminiService';
import { StudentAttendance, AttendanceInsights } from '../../types';
import { 
  UserCheck, 
  Users, 
  Sparkles, 
  Loader2, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Mail, 
  Search,
  ChevronRight,
  BarChart3,
  Info
} from 'lucide-react';

const INITIAL_STUDENTS: StudentAttendance[] = [
  { id: '1', name: 'Alex Johnson', status: 'present' },
  { id: '2', name: 'Brian Smith', status: 'present' },
  { id: '3', name: 'Catherine Davis', status: 'absent' },
  { id: '4', name: 'Daniel Wilson', status: 'present' },
  { id: '5', name: 'Emily Brown', status: 'late' },
  { id: '6', name: 'Frank Miller', status: 'present' },
  { id: '7', name: 'Grace Taylor', status: 'present' },
  { id: '8', name: 'Henry Moore', status: 'absent' },
];

const Attendance: React.FC = () => {
  const [students, setStudents] = useState<StudentAttendance[]>(INITIAL_STUDENTS);
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<AttendanceInsights | null>(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [search, setSearch] = useState('');

  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const stats = {
    total: students.length,
    present: students.filter(s => s.status === 'present').length,
    absent: students.filter(s => s.status === 'absent').length,
    late: students.filter(s => s.status === 'late').length,
  };

  const updateStatus = (id: string, status: 'present' | 'absent' | 'late') => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const generateInsights = async () => {
    setLoading(true);
    try {
      const absentList = students.filter(s => s.status === 'absent').map(s => s.name).join(', ');
      const prompt = `Review the following attendance for today (${date}): 
        Total students: ${stats.total}, 
        Present: ${stats.present}, 
        Absent: ${absentList}. 
        Provide a concise AI summary and draft professional parent notification emails for each absent student.`;
      
      const response = await generateContent(prompt, AttendanceInsightSchema);
      const data = JSON.parse(response || '{}');
      setInsights(data);
    } catch (err) {
      console.error(err);
      alert("Could not generate insights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="text-blue-600 w-8 h-8" />
            Attendance Manager
          </h1>
          <p className="text-slate-500 mt-1">Efficiently track presence and automate notifications.</p>
        </div>
        <div className="flex gap-2">
           <div className="relative">
             <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
               type="date" 
               value={date} 
               onChange={(e) => setDate(e.target.value)}
               className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none" 
             />
           </div>
           <button 
             onClick={generateInsights}
             disabled={loading}
             className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-50"
           >
             {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
             AI Insights
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total', value: stats.total, icon: Users, color: 'text-slate-600', bg: 'bg-slate-50' },
              { label: 'Present', value: stats.present, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Absent', value: stats.absent, icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
              { label: 'Late', value: stats.late, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((stat, i) => (
              <div key={i} className={`p-4 rounded-2xl border border-slate-100 ${stat.bg} flex items-center gap-4`}>
                <div className={`p-2 rounded-lg bg-white shadow-sm ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-xl font-extrabold text-slate-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Student Table */}
          <div className="glass-card rounded-2xl border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
               <div className="relative w-full max-w-xs">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Search students..." 
                   value={search}
                   onChange={e => setSearch(e.target.value)}
                   className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/10" 
                 />
               </div>
               <div className="text-xs font-bold text-slate-400 uppercase">Class 10-A</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Student Name</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map(student => (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4 font-medium text-slate-900">{student.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                            student.status === 'present' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                            student.status === 'absent' ? 'bg-rose-50 border-rose-100 text-rose-600' :
                            'bg-amber-50 border-amber-100 text-amber-600'
                          }`}>
                            {student.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => updateStatus(student.id, 'present')}
                            className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-600 transition-colors"
                            title="Mark Present"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => updateStatus(student.id, 'absent')}
                            className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-600 transition-colors"
                            title="Mark Absent"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => updateStatus(student.id, 'late')}
                            className="p-1.5 rounded-lg hover:bg-amber-100 text-amber-600 transition-colors"
                            title="Mark Late"
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredStudents.length === 0 && (
              <div className="p-12 text-center text-slate-400 italic">No students found matching your search.</div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
           {/* Sidebar Component: AI Insights */}
           <div className="glass-card p-6 rounded-2xl border border-slate-100 min-h-[400px]">
             <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
               <Sparkles className="w-5 h-5 text-indigo-500" />
               <h3 className="font-bold text-slate-900">AI Assistant</h3>
             </div>

             {!insights && !loading && (
               <div className="flex flex-col items-center justify-center text-center h-[300px] text-slate-400">
                  <BarChart3 className="w-10 h-10 mb-3 opacity-20" />
                  <p className="text-sm">Generate AI Insights to analyze trends and draft parent emails.</p>
               </div>
             )}

             {loading && (
               <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-slate-100 rounded w-full"></div>
                  <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                  <div className="h-20 bg-slate-50 rounded w-full mt-6"></div>
               </div>
             )}

             {insights && !loading && (
               <div className="space-y-6">
                 <div>
                   <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                     <Info className="w-3 h-3" /> Summary
                   </h4>
                   <p className="text-sm text-slate-600 leading-relaxed bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                     {insights.summary}
                   </p>
                 </div>

                 {insights.notifications.length > 0 && (
                   <div className="space-y-3">
                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                       <Mail className="w-3 h-3" /> Draft Emails
                     </h4>
                     {insights.notifications.map((note, idx) => (
                       <div key={idx} className="p-3 rounded-xl border border-slate-100 bg-white hover:shadow-md transition-all group">
                         <div className="flex items-center justify-between mb-2">
                           <span className="text-xs font-bold text-slate-900">{note.studentName}</span>
                           <button className="text-xs text-blue-600 font-bold hover:underline">Copy</button>
                         </div>
                         <p className="text-[11px] text-slate-500 line-clamp-2 italic">
                           {note.draftEmail}
                         </p>
                       </div>
                     ))}
                   </div>
                 )}
               </div>
             )}
           </div>

           <div className="bg-blue-600 p-6 rounded-2xl text-white">
              <h4 className="font-bold mb-2">Daily Tip</h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                Consistent attendance tracking helps identify students at risk of falling behind early in the semester.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
