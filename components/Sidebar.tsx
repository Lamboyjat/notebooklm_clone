
import React, { useState } from 'react';
import { Plus, Search, Globe, Zap, ChevronRight, FileText, Youtube, Check } from 'lucide-react';
import { Source } from '../types';

interface SidebarProps {
  sources: Source[];
  onAddSource: (type: Source['type'], title: string, content: string, url?: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ sources, onAddSource, isOpen, onToggle }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="h-full flex flex-col gap-4 bg-transparent">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-semibold text-slate-700">Sources</h2>
        <button onClick={onToggle} className="p-1 hover:bg-slate-200 rounded">
          <ChevronRight size={18} className={isOpen ? 'rotate-180' : ''} />
        </button>
      </div>

      <div className="flex flex-col gap-3 bg-white p-4 rounded-2xl border shadow-sm h-full overflow-hidden">
        <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
          <Plus size={16} />
          Add sources
        </button>

        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={16} />
          </div>
          <input 
            type="text"
            placeholder="Search the web for new sources"
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-slate-200 text-slate-500 rounded-full hover:bg-slate-300">
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600">
            <Globe size={14} />
            Web
            <ChevronDown size={12} />
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600">
            <Zap size={14} />
            Fast Research
            <ChevronDown size={12} />
          </button>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-xs font-medium text-slate-500">Select all sources</span>
          <div className="w-4 h-4 rounded border flex items-center justify-center bg-indigo-600 border-indigo-600 text-white">
            <Check size={10} strokeWidth={4} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 py-2">
          {sources.map(source => (
            <div key={source.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl group transition-colors cursor-pointer">
              <div className="text-red-600">
                {source.type === 'youtube' ? <Youtube size={18} /> : <FileText size={18} />}
              </div>
              <span className="text-xs font-medium truncate flex-1 leading-tight text-slate-700">
                {source.title}
              </span>
              <div className="w-4 h-4 rounded border flex items-center justify-center bg-indigo-600 border-indigo-600 text-white">
                <Check size={10} strokeWidth={4} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChevronDown({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  );
}
