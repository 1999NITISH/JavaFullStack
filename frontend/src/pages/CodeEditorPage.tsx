import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Send, ChevronLeft, Settings, Terminal } from 'lucide-react';
import { toast } from 'sonner';

const templates: Record<string, string> = {
  javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your solution here
    
};`,
  java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
        return new int[]{};
    }
}`,
  python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your solution here
        pass`,
  cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        
        return {};
    }
};`
};

const CodeEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState(templates.java);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');

  useEffect(() => {
    // Update code template when language changes, but only if it's the default or empty
    setCode(templates[language]);
  }, [language]);

  const handleRun = () => {
    setIsRunning(true);
    // Simulate execution
    setTimeout(() => {
      setOutput('Test Case 1: Passed\\nTest Case 2: Passed\\nTest Case 3: Failed (Expected [1, 2], got [0, 0])');
      setIsRunning(false);
      toast.info('Code executed locally');
    }, 1500);
  };

  const handleSubmit = () => {
    toast.success('Solution submitted successfully!');
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 -m-6 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Header */}
      <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/questions')} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all">
            <ChevronLeft size={20} />
          </button>
          <div className="h-6 w-px bg-slate-800"></div>
          <h2 className="font-bold text-white text-lg">Problem #{id}: Two Sum</h2>
          <span className="px-3 py-1 rounded-lg bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.1)]">EASY</span>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-inner hover:bg-slate-700 transition-colors"
          >
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="javascript">JavaScript</option>
          </select>
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Description Panel */}
        <div className="w-[40%] border-r border-slate-800 overflow-y-auto p-8 bg-slate-950/50 custom-scrollbar">
          <h3 className="text-2xl font-bold mb-6 text-white tracking-tight">Two Sum</h3>
          <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
            <p className="text-base">Given an array of integers <code className="bg-slate-800/80 px-2 py-0.5 rounded-md text-blue-400 font-mono border border-slate-700">nums</code> and an integer <code className="bg-slate-800/80 px-2 py-0.5 rounded-md text-blue-400 font-mono border border-slate-700">target</code>, return indices of the two numbers such that they add up to <code className="bg-slate-800/80 px-2 py-0.5 rounded-md text-blue-400 font-mono border border-slate-700">target</code>.</p>
            <p className="text-base">You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.</p>
            
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-inner mt-8">
              <p className="font-bold mb-3 text-white text-xs uppercase tracking-widest text-blue-400">Example 1:</p>
              <pre className="text-sm font-mono text-slate-300 space-y-1">
                <div><span className="text-slate-500">Input:</span> nums = [2,7,11,15], target = 9</div>
                <div><span className="text-slate-500">Output:</span> [0,1]</div>
                <div><span className="text-slate-500">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].</div>
              </pre>
            </div>
            
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-inner mt-4">
              <p className="font-bold mb-3 text-white text-xs uppercase tracking-widest text-blue-400">Constraints:</p>
              <ul className="list-disc pl-5 space-y-2 font-mono text-xs text-slate-400 marker:text-slate-600">
                <li>2 {'<='} nums.length {'<='} 10^4</li>
                <li>-10^9 {'<='} nums[i] {'<='} 10^9</li>
                <li>-10^9 {'<='} target {'<='} 10^9</li>
                <li>Only one valid answer exists.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Editor & Console */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-900">
          <div className="flex-1 relative pt-2 min-h-0">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                fontSize: 15,
                minimap: { enabled: false },
                padding: { top: 20 },
                scrollBeyondLastLine: false,
                fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                fontLigatures: true,
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on",
                smoothScrolling: true,
                roundedSelection: true,
              }}
            />
          </div>
          
          {/* Console Output */}
          <div className="h-64 border-t border-slate-800 flex flex-col bg-slate-950/80 backdrop-blur-xl relative">
            <div className="h-12 border-b border-slate-800/50 flex items-center px-6 gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <Terminal size={16} className="text-blue-400" />
              Console Output
            </div>
            <div className="flex-1 overflow-auto p-6 font-mono text-sm text-slate-300">
              {isRunning ? (
                <div className="flex items-center gap-3 animate-pulse">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-blue-400">Compiling and executing code...</span>
                </div>
              ) : output ? (
                <pre className="whitespace-pre-wrap leading-relaxed">{output}</pre>
              ) : (
                <span className="italic text-slate-600 flex items-center h-full justify-center">
                  Run your code to see compilation and execution results here.
                </span>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="h-16 border-t border-slate-800 flex items-center justify-end px-6 bg-slate-900/90 gap-4">
            <button 
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all disabled:opacity-50 border border-slate-700"
            >
              <Play size={18} className={isRunning ? "animate-pulse text-blue-400" : "text-slate-400"} />
              Run Code
            </button>
            <button 
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold transition-all active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            >
              <Send size={18} />
              Submit Solution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPage;
