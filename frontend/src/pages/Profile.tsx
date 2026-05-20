import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { User, Mail, Award, Clock, Code, BookOpen, Camera, Bot } from 'lucide-react';

const Profile = () => {
  const { user } = useSelector((state: any) => state.auth);
  
  const [avatarUrl, setAvatarUrl] = useState(`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=0ea5e9&color=fff&size=128`);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const stats = [
    { label: 'Questions Solved', value: '124', icon: Code, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Interviews Completed', value: '12', icon: Clock, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Global Rank', value: '#452', icon: Award, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Current Streak', value: '15 Days', icon: BookOpen, color: 'text-green-400', bg: 'bg-green-400/10' },
  ];

  return (
    <div className="w-full h-full flex flex-col space-y-6 animate-in fade-in duration-500 min-h-0">
      <div className="flex items-center gap-4 shrink-0">
        <h1 className="text-3xl font-bold text-white">Your Profile</h1>
      </div>

      {/* Profile Header Card */}
      <div className="glass p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-slate-900/90 to-slate-950/90 relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div 
          className="relative z-10 group cursor-pointer shrink-0" 
          onClick={() => fileInputRef.current?.click()}
          title="Click to change profile picture"
        >
          <img
            src={avatarUrl}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full border-4 border-slate-800 shadow-xl object-cover transition-all group-hover:brightness-50"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera size={32} className="text-white drop-shadow-md" />
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        <div className="text-center md:text-left flex-1 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">{user?.name || 'Developer Name'}</h2>
          <div className="flex flex-col md:flex-row items-center gap-4 text-slate-400">
            <span className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
              <Mail size={16} className="text-blue-400" />
              {user?.email || 'developer@example.com'}
            </span>
            <span className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
              <User size={16} className="text-purple-400" />
              {user?.role?.replace('ROLE_', '') || 'USER'}
            </span>
          </div>
        </div>
        <button className="relative z-10 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20">
          Edit Profile
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors group shadow-md">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg} group-hover:scale-110 transition-transform shadow-inner`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass p-8 rounded-3xl border border-slate-800 flex-1 flex flex-col min-h-0 shadow-lg">
        <h3 className="text-xl font-bold text-white mb-6 shrink-0 flex items-center gap-2">
          <Clock size={20} className="text-blue-400"/> Recent Activity
        </h3>
        <div className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pr-4 pb-2">
          <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-slate-700/50 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 shadow-inner">
              <Code size={20} className="text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Solved "Two Sum"</p>
              <p className="text-sm text-slate-400">Java • Easy • 2 hours ago</p>
            </div>
            <span className="text-green-400 text-sm font-bold bg-green-500/10 px-3 py-1 rounded-full">+10 XP</span>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-slate-700/50 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-inner">
              <Bot size={20} className="text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Completed Technical Mock Interview</p>
              <p className="text-sm text-slate-400">Score: 8.5/10 • 1 day ago</p>
            </div>
            <span className="text-green-400 text-sm font-bold bg-green-500/10 px-3 py-1 rounded-full">+50 XP</span>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-slate-700/50 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-inner">
              <Code size={20} className="text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Solved "Merge k Sorted Lists"</p>
              <p className="text-sm text-slate-400">Python • Hard • 3 days ago</p>
            </div>
            <span className="text-green-400 text-sm font-bold bg-green-500/10 px-3 py-1 rounded-full">+30 XP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
