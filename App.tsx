
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import LessonPlan from './pages/Tools/LessonPlan';
import QuestionPaper from './pages/Tools/QuestionPaper';
import Attendance from './pages/Tools/Attendance';
import Settings from './pages/Settings';
import Login from './pages/Login';

// Helper component for common placeholder tools
const PlaceholderTool: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white rounded-3xl border border-slate-100">
    <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6">
      <span className="text-4xl text-blue-600 font-bold">✨</span>
    </div>
    <h2 className="text-2xl font-bold text-slate-900">{name} Generator</h2>
    <p className="text-slate-500 max-w-md mt-2">
      This tool is currently being refined to provide the best AI assistance. 
      Check out the <strong>Lesson Plan</strong> or <strong>Question Paper</strong> generators in the meantime!
    </p>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/tools/attendance" element={<Layout><Attendance /></Layout>} />
        <Route path="/tools/lesson-plan" element={<Layout><LessonPlan /></Layout>} />
        <Route path="/tools/question-paper" element={<Layout><QuestionPaper /></Layout>} />
        <Route path="/tools/notes" element={<Layout><PlaceholderTool name="Study Notes" /></Layout>} />
        <Route path="/tools/homework" element={<Layout><PlaceholderTool name="Homework" /></Layout>} />
        <Route path="/tools/feedback" element={<Layout><PlaceholderTool name="Student Feedback" /></Layout>} />
        
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
