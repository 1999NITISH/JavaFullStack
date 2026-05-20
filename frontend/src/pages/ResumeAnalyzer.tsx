import { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertTriangle, Search, Lightbulb, FileCheck, ScanLine, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast.success('Resume uploaded successfully!');
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult({
        score: 82,
        skills: ['React', 'TypeScript', 'Node.js', 'Spring Boot', 'SQL', 'MongoDB', 'Git'],
        missing: ['Docker', 'AWS', 'System Design', 'Kubernetes'],
        feedback: "Your resume is strong in frontend and backend technologies but lacks cloud deployment and architecture experience. Consider adding specific project metrics (e.g., 'Improved performance by 20%') to increase your ATS score. Include keywords like AWS or Docker if you have any exposure.",
      });
      setIsAnalyzing(false);
      toast.success('Analysis complete!');
    }, 2500);
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700">
      <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Resume AI Analyzer</h1>
          <p className="text-slate-400 mt-2">Get instant feedback, skill extraction, and ATS scoring using advanced AI.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          {/* Upload Card */}
          <div className="glass p-8 rounded-3xl border border-slate-800 flex flex-col items-center text-center bg-gradient-to-b from-slate-900/80 to-slate-950 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
              file ? 'bg-green-500/20 text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }`}>
              {file ? <FileCheck size={40} className="animate-in zoom-in" /> : <Upload size={40} className="group-hover:-translate-y-1 transition-transform" />}
            </div>
            
            <h3 className="text-2xl font-bold mb-2 text-white">{file ? 'File Selected' : 'Upload Resume'}</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">Supported formats: PDF, DOCX.<br/>Max file size: 5MB.</p>
            
            <label className="w-full relative group/btn">
              <input type="file" className="hidden" onChange={handleUpload} accept=".pdf,.doc,.docx" />
              <div className={`w-full font-medium py-4 rounded-xl cursor-pointer transition-all border flex justify-center items-center gap-2 ${
                file 
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' 
                : 'bg-blue-600/10 border-blue-500/30 text-blue-400 hover:bg-blue-600/20 hover:border-blue-500/50'
              }`}>
                {file ? file.name : 'Browse Files'}
              </div>
            </label>
            
            <button 
              onClick={startAnalysis}
              disabled={!file || isAnalyzing}
              className={`w-full mt-4 font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 ${
                !file || isAnalyzing
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/20 active:scale-95'
              }`}
            >
              {isAnalyzing ? (
                <>Analyzing <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div></>
              ) : 'Start AI Analysis'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {!result && !isAnalyzing ? (
            <div className="h-full glass rounded-3xl border border-slate-800 flex flex-col items-center justify-center p-12 text-center bg-slate-900/50 min-h-[400px]">
              <div className="w-20 h-20 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 mb-6 shadow-inner">
                <ScanLine size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-300 mb-2">Ready to Analyze</h2>
              <p className="text-slate-500 max-w-sm">Upload your resume and click analyze to let our AI scan for keywords, missing skills, and calculate your ATS score.</p>
            </div>
          ) : isAnalyzing ? (
            <div className="h-full glass rounded-3xl border border-slate-800 flex flex-col items-center justify-center p-12 space-y-8 bg-slate-900/50 min-h-[400px] relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(59,130,246,0.1),transparent)] h-[200%] animate-[scan_2s_linear_infinite]"></div>
              
              <div className="relative z-10 w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <FileText size={32} className="text-blue-400 animate-pulse" />
              </div>
              <div className="space-y-3 text-center relative z-10">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Scanning Document...</p>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">Evaluating formatting, extracting key skills, and comparing against top tech roles.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="glass p-8 rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 relative z-10">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Analysis Complete</h3>
                    <p className="text-slate-400 text-sm">Here is your AI-generated resume report.</p>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner">
                    <div className="text-right">
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">ATS Score</p>
                      <p className={`text-xl font-medium ${result.score >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {result.score >= 80 ? 'Excellent' : 'Needs Work'}
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black border-4 border-slate-800 relative">
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="46" fill="none" stroke="#1e293b" strokeWidth="8" />
                        <circle cx="50" cy="50" r="46" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray="289" strokeDashoffset={289 - (289 * result.score) / 100} className="transition-all duration-1000 ease-out" />
                      </svg>
                      <span className="relative z-10 text-white">{result.score}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div className="bg-slate-950/50 p-6 rounded-2xl border border-green-500/10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 size={18} className="text-green-400" />
                      </div>
                      <h4 className="font-bold text-white">Identified Strengths</h4>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {result.skills.map((s: string) => (
                        <span key={s} className="px-3.5 py-1.5 bg-slate-900 text-green-400 rounded-xl text-sm font-medium border border-green-500/20 shadow-sm">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950/50 p-6 rounded-2xl border border-red-500/10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <AlertTriangle size={18} className="text-red-400" />
                      </div>
                      <h4 className="font-bold text-white">Missing Keywords</h4>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {result.missing.map((s: string) => (
                        <span key={s} className="px-3.5 py-1.5 bg-slate-900 text-red-400 rounded-xl text-sm font-medium border border-red-500/20 shadow-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-2xl border border-blue-500/20 relative z-10">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
                      <Lightbulb className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-blue-400 text-lg mb-2">AI Recommendation</p>
                      <p className="text-slate-300 leading-relaxed text-sm">{result.feedback}</p>
                      <button className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                        Generate Optimized Cover Letter <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
