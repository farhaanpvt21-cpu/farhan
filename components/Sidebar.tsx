
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  HelpCircle, 
  StickyNote, 
  Home, 
  MessageSquare, 
  Settings, 
  LogOut,
  BrainCircuit,
  UserCheck
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Attendance', path: '/tools/attendance', icon: UserCheck },
    { name: 'Lesson Plans', path: '/tools/lesson-plan', icon: FileText },
    { name: 'Question Papers', path: '/tools/question-paper', icon: HelpCircle },
    { name: 'Study Notes', path: '/tools/notes', icon: StickyNote },
    { name: 'Homework Generator', path: '/tools/homework', icon: Home },
    { name: 'Student Feedback', path: '/tools/feedback', icon: MessageSquare },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col z-40">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <BrainCircuit className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold text-slate-800">EduAssist AI</span>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              isActive(item.path) 
                ? 'bg-blue-50 text-blue-700 font-medium' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-blue-600' : 'text-slate-400'}`} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
            isActive('/settings') 
              ? 'bg-blue-50 text-blue-700 font-medium' 
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Settings className="w-5 h-5 text-slate-400" />
          Settings
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-1">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
