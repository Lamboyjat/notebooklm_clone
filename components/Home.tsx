
import React from 'react';
import { 
  Plus, Settings, LayoutGrid, List, ChevronDown, 
  MoreVertical, BookOpen, Search, Globe, ChevronRight 
} from 'lucide-react';
import { Notebook } from '../types';

interface HomeProps {
  notebooks: Notebook[];
  onSelectNotebook: (id: string) => void;
  onCreateNotebook: () => void;
}

export default function Home({ notebooks, onSelectNotebook, onCreateNotebook }: HomeProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <BookOpen size={18} fill="currentColor" />
          </div>
          <span className="text-xl font-medium tracking-tight">NotebookLM</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-full text-xs font-medium hover:bg-slate-50 transition-colors">
            <Settings size={14} />
            Settings
          </button>
          <span className="text-[10px] font-bold text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">PRO</span>
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
            <LayoutGrid size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white text-sm font-bold shadow-sm">
            L
          </div>
        </div>
      </header>

      {/* Hero / Filter Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full">
            <button className="px-5 py-1.5 bg-white shadow-sm rounded-full text-sm font-medium">All</button>
            <button className="px-5 py-1.5 text-slate-500 text-sm font-medium hover:text-slate-700">My notebooks</button>
            <button className="px-5 py-1.5 text-slate-500 text-sm font-medium hover:text-slate-700">Featured notebooks</button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-100 p-1 rounded-lg">
              <button className="p-1.5 bg-white shadow-sm rounded text-slate-600"><LayoutGrid size={16} /></button>
              <button className="p-1.5 text-slate-400"><List size={16} /></button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full text-sm font-medium">
              Most recent <ChevronDown size={14} />
            </button>
            <button 
              onClick={onCreateNotebook}
              className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full text-sm font-semibold hover:bg-zinc-800 transition-all active:scale-95"
            >
              <Plus size={18} />
              Create new
            </button>
          </div>
        </div>

        {/* Featured Notebooks Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Featured notebooks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeaturedCard 
              title="How To Build A Life, from The Atlantic"
              author="The Atlantic"
              date="Apr 22, 2025 • 46 sources"
              color="from-orange-400 to-red-500"
            />
            <FeaturedCard 
              title="Can chatbots serve doctors and patients?"
              author="Google Research"
              date="Jul 3, 2025 • 24 sources"
              color="from-blue-500 to-cyan-400"
            />
            <FeaturedCard 
              title="The Science Fan's Guide To Visiting..."
              author="Travel"
              date="May 12, 2025 • 17 sources"
              color="from-emerald-500 to-yellow-400"
            />
            <FeaturedCard 
              title="OpenStax's Biology"
              author="OpenStax"
              date="Jul 31, 2025 • 13 sources"
              color="from-purple-500 to-pink-400"
            />
          </div>
          <div className="mt-4 flex justify-end">
             <button className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 border px-3 py-1.5 rounded-full">
               See all <ChevronRight size={14} />
             </button>
          </div>
        </section>

        {/* Recent Notebooks Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Recent notebooks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Create Card */}
            <button 
              onClick={onCreateNotebook}
              className="aspect-[4/3] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
            >
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus size={24} />
              </div>
              <span className="text-slate-600 font-medium">Create new notebook</span>
            </button>

            {notebooks.map(nb => (
              <div 
                key={nb.id}
                onClick={() => onSelectNotebook(nb.id)}
                className={`aspect-[4/3] ${nb.bgColor || 'bg-slate-50'} rounded-3xl p-6 flex flex-col justify-between border border-transparent hover:border-slate-200 hover:shadow-md transition-all cursor-pointer relative group`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-3xl">{nb.icon || '📓'}</span>
                  <button className="p-1 hover:bg-white/50 rounded-full text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical size={18} />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 line-clamp-2 mb-2 leading-tight">
                    {nb.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    {new Date(nb.updatedAt).toLocaleDateString()} • {nb.sources.length} source{nb.sources.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function FeaturedCard({ title, author, date, color }: { title: string, author: string, date: string, color: string }) {
  return (
    <div className={`aspect-[4/3] rounded-3xl overflow-hidden relative group cursor-pointer`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-90 group-hover:scale-105 transition-transform duration-500`} />
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-[10px] font-bold">
            {author[0]}
          </div>
          <span className="text-[10px] font-semibold opacity-90">{author}</span>
        </div>
        <h3 className="font-bold leading-tight mb-2 text-lg line-clamp-2">{title}</h3>
        <div className="flex items-center justify-between opacity-80">
          <span className="text-[10px]">{date}</span>
          <Globe size={14} />
        </div>
      </div>
    </div>
  );
}
