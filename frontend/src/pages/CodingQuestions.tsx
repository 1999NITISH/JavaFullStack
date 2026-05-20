import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Bookmark } from 'lucide-react';
import { dsaQuestions, uniqueTopics } from '../data/questionsData';

const CodingQuestions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'EASY': return 'text-green-400 bg-green-400/10 border-green-500/20';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-400/10 border-yellow-500/20';
      case 'HARD': return 'text-red-400 bg-red-400/10 border-red-500/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-500/20';
    }
  };

  const filteredQuestions = dsaQuestions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500 flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end bg-slate-900/50 p-6 rounded-3xl border border-slate-800 shrink-0 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">DSA Topics & LeetCode 150</h1>
          <p className="text-slate-400 mt-2">Master Topic-Wise DSA questions. Top 150 patterns are highlighted.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search problem..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64 shadow-inner transition-all focus:bg-slate-900"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Sidebar Topics Filter */}
        <div className="w-64 glass rounded-3xl border border-slate-800 flex flex-col shrink-0 overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-900/50 font-bold text-white flex items-center gap-2">
             Topics
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            <button
              onClick={() => setSelectedTopic('All')}
              className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                selectedTopic === 'All' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              All Topics
            </button>
            {uniqueTopics.map(topic => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedTopic === topic ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Main Table */}
        <div className="flex-1 glass rounded-3xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
                <tr className="text-slate-400 text-sm font-semibold tracking-wide uppercase">
                  <th className="px-8 py-5">Status</th>
                  <th className="px-6 py-5">Title</th>
                  <th className="px-6 py-5">Difficulty</th>
                  <th className="px-6 py-5 text-center">Top 150</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredQuestions.map((q) => (
                  <tr key={q.id} className="hover:bg-blue-500/5 transition-colors group">
                    <td className="px-8 py-4">
                      {q.status === 'SOLVED' ? (
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-slate-700 group-hover:border-slate-500 transition-colors"></div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-200 group-hover:text-white transition-colors">
                      {q.id}. {q.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getDifficultyColor(q.difficulty)}`}>
                        {q.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {q.isTop150 && (
                        <span className="inline-flex items-center justify-center text-blue-400 bg-blue-400/10 p-1.5 rounded-lg border border-blue-500/20" title="Top 150 LeetCode Pattern">
                          <Bookmark size={16} />
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-4 text-right">
                      <Link 
                        to={`/editor/${q.id}`}
                        className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg font-medium transition-all group-hover:shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                      >
                        Solve 
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </td>
                  </tr>
                ))}
                {filteredQuestions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-slate-500">
                      No questions found matching your search or topic.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingQuestions;
