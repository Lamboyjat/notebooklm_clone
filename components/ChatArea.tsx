
import React, { useRef, useEffect } from 'react';
import { Send, MoreVertical, SlidersHorizontal, ChevronDown, Sparkles } from 'lucide-react';
import { Message } from '../types';

interface ChatAreaProps {
  messages: Message[];
  isTyping: boolean;
  inputValue: string;
  setInputValue: (val: string) => void;
  onSend: () => void;
}

export default function ChatArea({ messages, isTyping, inputValue, setInputValue, onSend }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-3 border-b shrink-0">
        <h2 className="text-sm font-semibold text-slate-700">Chat</h2>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
            <SlidersHorizontal size={18} />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8">
        {messages.map((msg, idx) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-indigo-50 p-4 rounded-2xl rounded-tr-none border border-indigo-100 shadow-sm' : ''}`}>
              {msg.role === 'assistant' ? (
                <div className="prose prose-slate prose-sm leading-relaxed text-slate-700">
                  <div className="mb-4">
                    {formatAssistantResponse(msg.content)}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-800">{msg.content}</p>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-1 items-center p-3 bg-slate-50 rounded-2xl border">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 pt-0 relative shrink-0">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
           <button className="bg-white border shadow-sm rounded-full p-1.5 hover:bg-slate-50 text-slate-400">
             <ChevronDown size={16} />
           </button>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl flex items-end p-2 transition-all focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-300">
          <textarea 
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            placeholder="Start typing..."
            className="flex-1 bg-transparent resize-none p-2 text-sm focus:outline-none max-h-32"
          />
          <div className="flex items-center gap-2 p-1">
            <span className="text-[10px] font-medium text-slate-400 mr-2 whitespace-nowrap">1 source</span>
            <button 
              onClick={onSend}
              disabled={!inputValue.trim() || isTyping}
              className="p-2 bg-slate-200 text-slate-400 rounded-full transition-all hover:bg-black hover:text-white disabled:hover:bg-slate-200 disabled:hover:text-slate-400"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatAssistantResponse(content: string) {
  // Rough markdown/citation parser for UI demo
  return content.split('\n').map((line, i) => {
    if (line.startsWith('#')) return <h3 key={i} className="font-bold text-lg mt-4 mb-2">{line.replace(/^#+\s/, '')}</h3>;
    if (line.startsWith('•')) return <li key={i} className="ml-4 mb-1 list-none flex gap-2"><span>•</span> <span>{line.substring(1)}</span></li>;
    
    // Process citations [1], [2], etc
    const processed = line.split(/(\[\d+\])/).map((part, j) => {
      const citationMatch = part.match(/\[(\d+)\]/);
      if (citationMatch) {
        return <span key={j} className="inline-flex items-center justify-center w-4 h-4 text-[10px] bg-indigo-100 text-indigo-700 rounded-full font-bold ml-1 cursor-help">{citationMatch[1]}</span>;
      }
      return part;
    });

    return <p key={i} className="mb-3 last:mb-0">{processed}</p>;
  });
}
