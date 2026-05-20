import { useState, useEffect, useRef } from 'react';
import { Mic, Send, Bot, User, Sparkles, AlertCircle, MicOff, Video, VideoOff } from 'lucide-react';
import { toast } from 'sonner';
import { fullStackQA } from '../data/interviewData';

// Define SpeechRecognition globally to fix TS errors
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const MockInterview = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: fullStackQA[0].question }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOn(true);
    } catch (err) {
      console.error("Error accessing media devices:", err);
      toast.error("Could not access camera/microphone. Please check browser permissions.");
    }
  };

  const stopMedia = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => {
        track.stop(); // Completely release hardware access (turns off laptop light)
      });
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  const toggleCamera = () => {
    if (isCameraOn) {
      stopMedia();
    } else {
      startMedia();
    }
  };

  useEffect(() => {
    // We intentionally DO NOT auto-start the camera here anymore.
    // The user must click the toggle button to trigger the permission prompt.

    // Initialize Web Speech API for transcription
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev ? prev + ' ' + transcript : transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        // Only show error if it's not a generic 'no-speech' timeout
        if (event.error !== 'no-speech') {
          toast.error('Microphone error: ' + event.error);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      toast.error('Voice recognition is not supported in this browser.');
    }

    // Cleanup media streams on unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
        toast.info('Listening... Speak now.');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const generateAIResponse = async (chatHistory: {role: string, content: string}[]) => {
    try {
      // Build a clean interview context for the AI
      const historyStr = chatHistory.map(m => `${m.role === 'ai' ? 'Interviewer' : 'Candidate'}: ${m.content}`).join('\n');
      const systemPrompt = "Act as a Senior Full-Stack Interviewer. Evaluate the candidate's last answer and ask the next technical question (Java/Spring/React/AWS). Be very concise (2 sentences). No markdown.";
      
      const finalPrompt = `${systemPrompt}\n\n${historyStr}\n\nInterviewer:`;

      // Using the base text endpoint which is much faster and more stable
      const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(finalPrompt)}?model=openai&cache=false`);

      if (!response.ok) {
        throw new Error('API Error');
      }

      let content = await response.text();
      
      // Clean up any notices or extra text
      if (content.includes("IMPORTANT NOTICE")) {
        content = content.replace(/⚠️[\s\S]*?normally\./g, "").trim();
      }
      
      return content.trim();
    } catch (err: any) {
      console.error("AI API Error:", err);
      return "The AI is momentarily busy. Please try sending your message again!";
    }
  };

  // Voice Output (Speech Synthesis)
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95; // Slightly slower for clear AI voice
      utterance.pitch = 1;
      
      // Try to find a good English voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Samantha') || v.lang.startsWith('en-US'));
      if (preferredVoice) utterance.voice = preferredVoice;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', content: input };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsProcessing(true);

    const aiResponseText = await generateAIResponse(newHistory);
    
    setMessages(prev => [...prev, { role: 'ai', content: aiResponseText }]);
    speakText(aiResponseText);
    setIsProcessing(false);
  };

  return (
    <div className="w-full flex-1 flex flex-col animate-in fade-in duration-500 min-h-0">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            AI Mock Interview <Sparkles className="text-yellow-400" size={24} />
          </h1>
          <p className="text-slate-400 mt-1">Full-Stack Engineering (Java, Spring Boot, React, AWS, DSA)</p>
        </div>
        <div className="flex gap-3">
          <span className="glass px-4 py-2 rounded-xl text-sm border-slate-700 bg-blue-900/30 text-blue-300">Question {currentQuestionIndex + 1}/{fullStackQA.length}</span>
          <span className="glass px-4 py-2 rounded-xl text-sm border-slate-700">Status: Active</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
        {/* Left Column: Chat Interface */}
        <div className="flex-[2] glass rounded-3xl border border-slate-800 overflow-hidden flex flex-col bg-slate-900/80 shadow-2xl relative min-h-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-blue-500/10 blur-[100px] pointer-events-none"></div>
          
          {/* Messages */}
          <div className="flex-1 overflow-auto p-8 space-y-6 scroll-smooth custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
                  msg.role === 'ai' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-slate-700'
                }`}>
                  {msg.role === 'ai' ? <Bot size={20} className="text-white" /> : <User size={20} />}
                </div>
                <div className={`max-w-[80%] p-5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'ai' 
                    ? 'bg-slate-800/80 backdrop-blur-md text-slate-200 border border-slate-700/50 shadow-xl' 
                    : 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Bot size={20} className="text-white" />
                </div>
                <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700/50 shadow-xl">
                  <div className="flex gap-1.5 items-center h-full">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="p-6 bg-slate-950/80 border-t border-slate-800 backdrop-blur-xl">
            <div className="flex gap-4">
              <button 
                onClick={toggleListen}
                className={`p-3 rounded-xl transition-all shadow-lg flex items-center justify-center shrink-0 ${
                  isListening 
                  ? 'bg-red-500 text-white animate-pulse shadow-red-500/20' 
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
                title="Click to speak"
              >
                {isListening ? <MicOff size={24} /> : <Mic size={24} />}
              </button>
              <div className="flex-1 relative group">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  type="text"
                  placeholder={isListening ? "Listening..." : "Type your answer or use the microphone..."}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-900 transition-all shadow-inner"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-all disabled:opacity-50 disabled:hover:bg-blue-600"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
            <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-widest flex items-center justify-center gap-2">
              <AlertCircle size={10} /> Powered by InterviewAI Engine
            </p>
          </div>
        </div>

        {/* Right Column: Status & Video Panel */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar min-h-0 pr-2 pb-4">
          {/* Real Camera Feed */}
          <div className="glass rounded-3xl border border-slate-800 p-0 flex flex-col items-center justify-center bg-slate-900/50 relative overflow-hidden aspect-video shadow-lg group">
            <div className="absolute top-4 left-4 flex gap-2 items-center z-10">
              <div className={`w-2.5 h-2.5 rounded-full ${isCameraOn ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`}></div>
              <span className="text-xs font-bold text-white tracking-widest uppercase drop-shadow-md">
                {isCameraOn ? 'LIVE' : 'OFF'}
              </span>
            </div>

            <button 
              onClick={toggleCamera}
              className="absolute top-3 right-3 z-10 p-2 bg-slate-900/60 hover:bg-slate-800 backdrop-blur-md rounded-lg text-slate-300 hover:text-white transition-colors border border-slate-700/50"
              title={isCameraOn ? "Turn off camera" : "Turn on camera"}
            >
              {isCameraOn ? <Video size={18} /> : <VideoOff size={18} />}
            </button>
            
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className={`w-full h-full object-cover transition-opacity duration-1000 ${isCameraOn ? 'opacity-100' : 'opacity-0 absolute'}`} 
            />

            {!isCameraOn && (
              <div className="flex flex-col items-center justify-center p-6 w-full h-full">
                <User size={64} className="text-slate-700 mb-4 animate-pulse" />
                <p className="text-slate-500 font-medium">Requesting Camera...</p>
              </div>
            )}

            {isListening && (
              <div className="absolute inset-x-0 bottom-6 flex justify-center gap-1.5 z-10 bg-slate-900/40 py-2 backdrop-blur-sm">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`w-1.5 bg-blue-400 rounded-full animate-pulse shadow-lg`} style={{ height: `${Math.random() * 24 + 8}px`, animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            )}
          </div>

          {/* Interview Metadata */}
          <div className="glass rounded-3xl border border-slate-800 p-6 bg-slate-900/50 space-y-6 shadow-lg">
             <div>
               <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                 <AlertCircle size={18} className="text-blue-400"/> Session Rules
               </h3>
               <ul className="text-sm text-slate-400 space-y-2 list-disc pl-5 marker:text-slate-600">
                 <li>Ensure you are in a quiet environment.</li>
                 <li>Speak clearly into your microphone.</li>
                 <li>Answer technical questions concisely.</li>
                 <li>If you don't know the answer, simply ask the AI to explain it!</li>
               </ul>
             </div>
             
             <div className="pt-6 border-t border-slate-800">
               <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Progress</h3>
               <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
                 <div 
                   className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                   style={{ width: `${((currentQuestionIndex + 1) / fullStackQA.length) * 100}%` }}
                 ></div>
               </div>
               <p className="text-xs text-slate-500 text-right">{currentQuestionIndex + 1} of {fullStackQA.length} Completed</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterview;
