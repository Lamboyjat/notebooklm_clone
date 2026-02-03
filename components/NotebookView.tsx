
import React, { useState } from 'react';
import { 
  Plus, Search, Globe, Zap, Check, Send, 
  Settings, Share2, BarChart3, 
  BookOpen, MoreVertical, ChevronDown,
  PanelLeftOpen, PanelRightOpen, LayoutGrid
} from 'lucide-react';
import { Source, Notebook, Message } from '../types';
import * as gemini from '../services/geminiService';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import StudioPanel from './StudioPanel';

interface NotebookViewProps {
  notebook: Notebook;
  onBack: () => void;
  onUpdate: (updated: Notebook) => void;
}

export default function NotebookView({ notebook, onBack, onUpdate }: NotebookViewProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isStudioOpen, setStudioOpen] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue
    };

    const newMessages = [...notebook.messages, userMessage];
    onUpdate({ ...notebook, messages: newMessages });
    
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await gemini.chatWithSources(
        inputValue, 
        notebook.sources, 
        newMessages
      );
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response
      };

      onUpdate({ 
        ...notebook, 
        messages: [...newMessages, assistantMessage],
        updatedAt: Date.now()
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleAddSource = (type: Source['type'], title: string, content: string, url?: string) => {
    const newSource: Source = {
      id: Date.now().toString(),
      title,
      type,
      content,
      url
    };
    
    onUpdate({
      ...notebook,
      sources: [...notebook.sources, newSource],
      updatedAt: Date.now()
    });
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Header */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition-colors"
          >
            <BookOpen size={20} fill="currentColor" />
          </button>
          <div className="flex items-center gap-2 group cursor-pointer">
            <h1 className="font-semibold text-lg truncate max-w-md">
              {notebook.title}
            </h1>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-5 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-zinc-800 transition-all active:scale-95">
            <Plus size={16} />
            Create notebook
          </button>
          <div className="h-8 w-[1px] bg-slate-200 mx-2" />
          <div className="flex items-center gap-1">
            <NavIconButton icon={<BarChart3 size={20} />} label="Analytics" />
            <NavIconButton icon={<Share2 size={20} />} label="Share" />
            <NavIconButton icon={<Settings size={20} />} label="Settings" />
          </div>
          <div className="flex items-center gap-2 ml-2 pl-2 border-l">
            <span className="text-[10px] font-bold text-slate-400 border px-1.5 py-0.5 rounded">PRO</span>
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><LayoutGrid size={20} /></button>
            <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold shadow-sm">L</div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-1 overflow-hidden p-3 gap-3 relative">
        {/* Sidebar Panel */}
        <div className={`${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden shrink-0`}>
          <Sidebar 
            sources={notebook.sources} 
            onAddSource={handleAddSource} 
            isOpen={isSidebarOpen}
            onToggle={() => setSidebarOpen(!isSidebarOpen)}
          />
        </div>

        {/* Sidebar Expansion Button (Visible only when sidebar is closed) */}
        {!isSidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(true)}
            className="absolute left-4 top-6 z-10 p-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-all text-slate-500 hover:text-indigo-600 group"
            title="Show Sources"
          >
            <PanelLeftOpen size={20} />
            <span className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Sources</span>
          </button>
        )}

        {/* Central Chat Container */}
        <div className="flex-1 flex flex-col bg-white rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden transition-all duration-300">
          <ChatArea 
            messages={notebook.messages} 
            isTyping={isTyping} 
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSend={handleSendMessage}
          />
        </div>

        {/* Studio Panel Expansion Button (Visible only when studio is closed) */}
        {!isStudioOpen && (
          <button 
            onClick={() => setStudioOpen(true)}
            className="absolute right-4 top-6 z-10 p-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-all text-slate-500 hover:text-indigo-600 group"
            title="Show Studio"
          >
            <PanelRightOpen size={20} />
            <span className="absolute right-full mr-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Studio</span>
          </button>
        )}

        {/* Studio Panel */}
        <div className={`${isStudioOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden shrink-0`}>
          <StudioPanel 
            sources={notebook.sources}
            isOpen={isStudioOpen}
            onToggle={() => setStudioOpen(!isStudioOpen)}
          />
        </div>
      </main>
      
      <footer className="h-6 flex items-center justify-center text-[10px] text-slate-400 font-medium">
        NotebookLM can be inaccurate; please double check its responses.
      </footer>
    </div>
  );
}

function NavIconButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-1.5 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
