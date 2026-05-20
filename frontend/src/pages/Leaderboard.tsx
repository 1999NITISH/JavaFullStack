import { useState } from 'react';
import { Trophy, Medal, Target, Flame } from 'lucide-react';

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState('Weekly');

  const getTopUsers = () => {
    switch (timeframe) {
      case 'Monthly':
        return [
          { rank: 1, name: 'Alex Johnson', score: 45200, solved: 1205, accuracy: '95%', streak: 28 },
          { rank: 2, name: 'Michael Ross', score: 42100, solved: 1100, accuracy: '90%', streak: 35 },
          { rank: 3, name: 'Sarah Chen', score: 39800, solved: 950, accuracy: '93%', streak: 12 },
          { rank: 4, name: 'David Kim', score: 37500, solved: 890, accuracy: '88%', streak: 18 },
          { rank: 5, name: 'Emma Wilson', score: 35000, solved: 820, accuracy: '89%', streak: 22 },
        ];
      case 'All Time':
        return [
          { rank: 1, name: 'Sarah Chen', score: 145000, solved: 3200, accuracy: '96%', streak: 150 },
          { rank: 2, name: 'Emma Wilson', score: 142000, solved: 3150, accuracy: '94%', streak: 120 },
          { rank: 3, name: 'Alex Johnson', score: 139000, solved: 3000, accuracy: '92%', streak: 85 },
          { rank: 4, name: 'Michael Ross', score: 135000, solved: 2900, accuracy: '91%', streak: 110 },
          { rank: 5, name: 'David Kim', score: 128000, solved: 2750, accuracy: '89%', streak: 60 },
        ];
      case 'Weekly':
      default:
        return [
          { rank: 1, name: 'Alex Johnson', score: 12450, solved: 452, accuracy: '94%', streak: 15 },
          { rank: 2, name: 'Sarah Chen', score: 11200, solved: 410, accuracy: '91%', streak: 8 },
          { rank: 3, name: 'Michael Ross', score: 10850, solved: 395, accuracy: '89%', streak: 21 },
          { rank: 4, name: 'Emma Wilson', score: 9900, solved: 350, accuracy: '87%', streak: 4 },
          { rank: 5, name: 'David Kim', score: 9400, solved: 332, accuracy: '85%', streak: 12 },
        ];
    }
  };

  const topUsers = getTopUsers();

  return (
    <div className="w-full flex-1 flex flex-col space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            Global Leaderboard <Trophy className="text-yellow-400" size={28} />
          </h1>
          <p className="text-slate-400 mt-1">Top performers across the platform.</p>
        </div>
        <div className="flex gap-2">
          {['Weekly', 'Monthly', 'All Time'].map((tf) => (
            <button 
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                timeframe === tf 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex gap-8 min-h-0">
        {/* Left Column: Table */}
        <div className="flex-[2] glass rounded-3xl border border-slate-800 overflow-hidden flex flex-col min-h-0">
          <div className="overflow-auto custom-scrollbar flex-1">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-slate-900 z-10">
                <tr className="bg-white/5 text-slate-500 text-xs uppercase tracking-widest font-bold border-b border-slate-800 shadow-sm">
                  <th className="px-6 py-5">Rank</th>
                  <th className="px-6 py-5">User</th>
                  <th className="px-6 py-5 text-center">Streak</th>
                  <th className="px-6 py-5 text-center">Accuracy</th>
                  <th className="px-6 py-5 text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {topUsers.map((user) => (
                  <tr key={user.name} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-5 font-black text-slate-500">#{user.rank}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-center gap-1.5 w-max">
                        <img
                          src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`}
                          alt=""
                          className="w-10 h-10 rounded-xl shadow-md border border-slate-700"
                        />
                        <span className="font-bold text-slate-200 text-xs text-center">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-bold border border-orange-500/20">
                        <Flame size={14} /> {user.streak}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center font-medium text-slate-400">{user.accuracy}</td>
                    <td className="px-6 py-5 text-right font-black text-blue-400">{user.score.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Top 3 Cards Stacked Vertically */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2 min-h-0 pb-4">
          <h2 className="text-xl font-bold text-white shrink-0">Podium Finishes</h2>
          {topUsers.slice(0, 3).map((user, idx) => (
            <div key={user.name} className={`glass p-6 rounded-3xl border shrink-0 ${
              idx === 0 ? 'border-yellow-500/50 bg-yellow-500/5 scale-[1.02] shadow-2xl shadow-yellow-500/10' : 'border-slate-800'
            } relative flex flex-col items-center text-center transition-all`}>
              {idx === 0 && <Medal className="absolute -top-3 text-yellow-500" size={32} />}
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`}
                alt={user.name}
                className={`rounded-full border-4 border-slate-800 mb-3 ${idx === 0 ? 'w-24 h-24' : 'w-16 h-16'}`}
              />
              <h3 className="text-lg font-bold text-white">{user.name}</h3>
              <p className="text-blue-400 font-black text-xl mt-1">{user.score.toLocaleString()}</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-0.5">Points</p>
              
              <div className="grid grid-cols-2 gap-4 w-full pt-4 mt-4 border-t border-slate-800">
                <div>
                  <p className="text-white font-bold text-sm">{user.solved}</p>
                  <p className="text-slate-500 text-[9px] uppercase">Solved</p>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{user.accuracy}</p>
                  <p className="text-slate-500 text-[9px] uppercase">Accuracy</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
