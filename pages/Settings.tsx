
import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Save, 
  CheckCircle2, 
  Mail, 
  Briefcase 
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaved, setIsSaved] = useState(false);

  const tabs = [
    { id: 'profile', name: 'General Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'preferences', name: 'Teaching Prefs', icon: Briefcase },
    { id: 'security', name: 'Account Security', icon: Shield },
  ];

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
          <p className="text-slate-500 mt-1">Manage your professional profile and preferences.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>

        <div className="flex-1 glass-card p-8 rounded-2xl border border-slate-100">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                <div className="relative group">
                   <div className="w-24 h-24 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 text-3xl font-bold">SM</div>
                   <button className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50">
                     <User className="w-4 h-4 text-slate-500" />
                   </button>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Profile Photo</h3>
                  <p className="text-sm text-slate-500 mt-0.5">JPG or PNG. Max size 2MB.</p>
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs font-bold text-blue-600 hover:underline">Change</button>
                    <button className="text-xs font-bold text-red-500 hover:underline">Remove</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" defaultValue="Sarah Miller" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="email" defaultValue="sarah.m@educity.com" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Primary Subject</label>
                  <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20">
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Teaching Level</label>
                  <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20">
                    <option>Middle School</option>
                    <option>High School</option>
                    <option>College / University</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-500" /> AI Language
                </h3>
                <p className="text-sm text-slate-500">Choose the language AI will use to generate content.</p>
                <div className="flex flex-wrap gap-2">
                   {['English', 'Spanish', 'French', 'German', 'Hindi'].map(lang => (
                     <button key={lang} className={`px-4 py-2 rounded-lg border text-sm font-medium ${lang === 'English' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-600'}`}>
                       {lang}
                     </button>
                   ))}
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Moon className="w-5 h-5 text-indigo-500" /> Dark Mode
                    </h3>
                    <p className="text-sm text-slate-500">Enable high-contrast night theme.</p>
                  </div>
                  <button className="w-12 h-6 bg-slate-200 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button className="px-6 py-2.5 rounded-xl text-slate-600 font-bold hover:bg-slate-100">Cancel</button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              {isSaved ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
              {isSaved ? 'Changes Saved' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
