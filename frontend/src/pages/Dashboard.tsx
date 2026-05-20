import { useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { CheckCircle2, Target, Trophy, Clock, ArrowRight, Zap, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState('This Week');
  
  const stats = [
    { name: 'Problems Solved', value: '124', icon: CheckCircle2, gradient: 'from-green-500 to-emerald-400', shadow: 'shadow-green-500/20', link: '/questions' },
    { name: 'Average Accuracy', value: '78%', icon: Target, gradient: 'from-blue-500 to-cyan-400', shadow: 'shadow-blue-500/20', link: '/profile' },
    { name: 'Global Rank', value: '#452', icon: Trophy, gradient: 'from-amber-400 to-orange-500', shadow: 'shadow-amber-500/20', link: '/leaderboard' },
    { name: 'Interview Score', value: '8.5', icon: Clock, gradient: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/20', link: null }, // Removed routing
  ];

  // Dynamic data based on timeframe
  const getChartData = () => {
    switch (timeframe) {
      case 'This Month':
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          data: [25, 40, 35, 50]
        };
      case 'This Year':
        return {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          data: [100, 150, 120, 200, 250, 180, 220, 300, 280, 350, 310, 400]
        };
      case 'This Week':
      default:
        return {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: [4, 6, 8, 5, 9, 12, 7]
        };
    }
  };

  const currentChartData = getChartData();

  const lineData = {
    labels: currentChartData.labels,
    datasets: [
      {
        label: 'Submissions',
        data: currentChartData.data,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#1e293b',
        pointBorderColor: '#3b82f6',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const doughnutData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [50, 45, 29],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative glass p-8 rounded-3xl border border-slate-800 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full border border-blue-500/30 flex items-center gap-1">
                <Zap size={12} /> Pro Member
              </span>
            </div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Welcome back, Developer!
            </h1>
            <p className="text-slate-400 mt-2 text-lg">You're on a 15-day streak. Keep it up!</p>
          </div>
          <button 
            onClick={() => navigate('/interview')}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all active:scale-95 flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <span className="relative z-10">Start Mock Interview</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div 
            key={stat.name} 
            onClick={() => { if(stat.link) navigate(stat.link); }}
            className={`${stat.link ? 'cursor-pointer hover:bg-slate-800/80' : 'cursor-default'} relative group glass p-6 rounded-3xl border border-slate-800 bg-slate-900/50 transition-all duration-300 overflow-hidden`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 opacity-20 blur-3xl rounded-full bg-gradient-to-br ${stat.gradient} group-hover:opacity-40 transition-opacity duration-500`}></div>
            <div className="relative z-10 flex items-center justify-between mb-6">
              <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg ${stat.shadow} text-white ${stat.link ? 'group-hover:scale-110' : ''} transition-transform duration-300`}>
                <stat.icon size={24} />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-green-400 flex items-center gap-1 bg-green-400/10 px-2 py-1 rounded-lg">
                  +12% {stat.link && <ArrowRight size={10} className="-rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </span>
              </div>
            </div>
            <div className="relative z-10">
              <p className={`text-slate-400 text-sm font-semibold tracking-wide uppercase ${stat.link ? 'group-hover:text-slate-300' : ''} transition-colors`}>{stat.name}</p>
              <p className="text-3xl font-extrabold text-white mt-1 font-mono tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-8 rounded-3xl border border-slate-800 bg-slate-900/50 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <ActivityIcon /> Activity Progress
            </h2>
            <select 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-sm rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:bg-slate-700 transition-colors"
            >
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="This Year">This Year</option>
            </select>
          </div>
          <div className="h-[320px] w-full">
            <Line 
              data={lineData} 
              options={{ 
                maintainAspectRatio: false, 
                plugins: { 
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#94a3b8',
                    bodyColor: '#fff',
                    padding: 12,
                    borderColor: 'rgba(51, 65, 85, 0.5)',
                    borderWidth: 1,
                    displayColors: false,
                    cornerRadius: 8,
                  }
                },
                scales: { 
                  y: { 
                    beginAtZero: true, 
                    grid: { color: 'rgba(255,255,255,0.03)' },
                    border: { display: false },
                    ticks: { color: '#64748b', font: { family: 'monospace' } }
                  }, 
                  x: { 
                    grid: { display: false },
                    border: { display: false },
                    ticks: { color: '#64748b' }
                  } 
                } 
              }} 
            />
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border border-slate-800 bg-slate-900/50 flex flex-col">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Star className="text-yellow-400" size={24} /> Solved by Difficulty
          </h2>
          <div className="flex-1 flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-4xl font-bold text-white">124</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Total</span>
            </div>
            <div className="h-[280px] w-full relative z-10">
              <Doughnut 
                data={doughnutData} 
                options={{ 
                  cutout: '75%', 
                  maintainAspectRatio: false,
                  plugins: { 
                    legend: { 
                      position: 'bottom', 
                      labels: { 
                        color: '#94a3b8', 
                        usePointStyle: true, 
                        padding: 24,
                        font: { size: 13, weight: 'bold' }
                      } 
                    },
                    tooltip: {
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      padding: 12,
                      cornerRadius: 8,
                      borderColor: 'rgba(51, 65, 85, 0.5)',
                      borderWidth: 1,
                    }
                  } 
                }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityIcon = () => (
  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
    <div className="flex items-end gap-0.5 h-4">
      <div className="w-1 bg-blue-400 rounded-full h-2 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
      <div className="w-1 bg-blue-400 rounded-full h-4 animate-[pulse_1.5s_ease-in-out_0.2s_infinite]"></div>
      <div className="w-1 bg-blue-400 rounded-full h-3 animate-[pulse_1.5s_ease-in-out_0.4s_infinite]"></div>
    </div>
  </div>
);

export default Dashboard;
