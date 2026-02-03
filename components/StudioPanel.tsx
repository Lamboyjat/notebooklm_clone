
import React, { useState } from 'react';
import { 
  AudioLines, Play, MoreVertical, LayoutGrid, ListChecks, 
  Map, BarChart, Info, FileText, Layout,
  ChevronRight, Plus, ExternalLink
} from 'lucide-react';
import { GuideType, Source } from '../types';
import * as gemini from '../services/geminiService';

interface StudioPanelProps {
  sources: Source[];
  isOpen: boolean;
  onToggle: () => void;
}

const GUIDE_CARDS = [
  { id: 'audio', title: 'Audio Overview', icon: <AudioLines size={18} />, color: 'bg-indigo-50 text-indigo-600', borderColor: 'border-indigo-100' },
  { id: 'video', title: 'Video Overview', icon: <Play size={18} />, color: 'bg-emerald-50 text-emerald-600', borderColor: 'border-emerald-100' },
  { id: 'mindmap', title: 'Mind Map', icon: <Map size={18} />, color: 'bg-rose-50 text-rose-600', borderColor: 'border-rose-100' },
  { id: 'reports', title: 'Reports', icon: <FileText size={18} />, color: 'bg-yellow-50 text-yellow-700', borderColor: 'border-yellow-100' },
  { id: 'flashcards', title: 'Flashcards', icon: <LayoutGrid size={18} />, color: 'bg-orange-50 text-orange-600', borderColor: 'border-orange-100' },
  { id: 'quiz', title: 'Quiz', icon: <ListChecks size={18} />, color: 'bg-blue-50 text-blue-600', borderColor: 'border-blue-100' },
  { id: 'infographic', title: 'Infographic', icon: <Info size={18} />, color: 'bg-purple-50 text-purple-600', borderColor: 'border-purple-100' },
  { id: 'slidedeck', title: 'Slide Deck', icon: <Layout size={18} />, color: 'bg-amber-50 text-amber-600', borderColor: 'border-amber-100' },
  { id: 'datatable', title: 'Data Table', icon: <BarChart size={18} />, color: 'bg-slate-50 text-slate-600', borderColor: 'border-slate-100' },
];

export default function StudioPanel({ sources, isOpen, onToggle }: StudioPanelProps) {
  const [activeGuide, setActiveGuide] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGuideClick = async (guideId: string) => {
    setIsGenerating(true);
    setActiveGuide(guideId);
    // Simulation of guide generation
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-semibold text-slate-700">Studio</h2>
        <button onClick={onToggle} className="p-1 hover:bg-slate-200 rounded">
          <ChevronRight size={18} className={!isOpen ? 'rotate-180' : ''} />
        </button>
      </div>

      <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl border shadow-sm h-full overflow-y-auto">
        <div className="grid grid-cols-2 gap-2">
          {GUIDE_CARDS.map(card => (
            <button
              key={card.id}
              onClick={() => handleGuideClick(card.id)}
              className={`flex items-start justify-between p-3 rounded-xl border transition-all hover:shadow-sm group ${card.borderColor} ${card.color} opacity-90 hover:opacity-100`}
            >
              <div className="flex flex-col gap-3">
                <div className="p-1.5 rounded-lg bg-white/50 w-fit">
                  {card.icon}
                </div>
                <span className="text-[11px] font-semibold text-left">{card.title}</span>
              </div>
              <div className="p-1 bg-white/50 rounded hover:bg-white transition-colors">
                <Plus size={12} />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recent Outputs</h3>
            <button className="text-[10px] font-semibold text-indigo-600">See all</button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border group hover:border-indigo-200 transition-all cursor-pointer">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <Map size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate text-slate-800">The Blueprint for Financial Freedom...</p>
                <p className="text-[10px] text-slate-400">1 source • 17h ago</p>
              </div>
              <button className="p-1 text-slate-400 opacity-0 group-hover:opacity-100">
                <MoreVertical size={14} />
              </button>
            </div>
          </div>
        </div>

        <button className="mt-auto flex items-center justify-center gap-2 py-3 bg-black text-white rounded-2xl text-sm font-semibold hover:bg-zinc-800 transition-colors">
           <LayoutGrid size={18} />
           Add note
        </button>
      </div>
    </div>
  );
}
