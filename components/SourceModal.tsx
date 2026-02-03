
import React, { useState } from 'react';
import { Search, Globe, Zap, ChevronRight, X, Upload, Youtube, Database, FileText } from 'lucide-react';

interface SourceModalProps {
  onClose: () => void;
  onConfirm: (title: string, firstSource?: any) => void;
}

export default function SourceModal({ onClose, onConfirm }: SourceModalProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleCreate = () => {
    // For demo, just finish. In reality, it would process the source.
    onConfirm("My New Notebook");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="bg-white w-full max-w-3xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-10 flex flex-col items-center text-center">
          <div className="flex justify-between w-full mb-6">
            <div className="w-6" /> {/* spacer */}
            <h2 className="text-2xl font-medium text-slate-800">
              Create Audio and Video Overviews from <span className="bg-gradient-to-r from-blue-500 via-emerald-500 to-indigo-500 bg-clip-text text-transparent">websites</span>
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Search Input Area */}
          <div className="w-full max-w-2xl relative mb-12">
            <div className="bg-white border-2 border-indigo-100 rounded-2xl p-2 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all flex items-center shadow-sm">
              <div className="pl-3 pr-2 text-slate-400">
                <Search size={20} />
              </div>
              <input 
                type="text"
                placeholder="Search the web for new sources"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 py-3 text-lg bg-transparent focus:outline-none placeholder:text-slate-300"
              />
              <div className="flex items-center gap-1">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100">
                  <Globe size={14} /> Web <ChevronRight size={12} className="rotate-90" />
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100">
                  <Zap size={14} /> Fast Research <ChevronRight size={12} className="rotate-90" />
                </button>
                <button 
                  onClick={handleCreate}
                  className="p-2.5 bg-slate-100 text-slate-400 rounded-full ml-1 hover:bg-black hover:text-white transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Drop Zone */}
          <div className="w-full border-2 border-dashed border-slate-100 rounded-[32px] p-12 flex flex-col items-center justify-center gap-8 group hover:border-indigo-200 transition-colors cursor-pointer bg-slate-50/30">
            <span className="text-slate-400 font-medium text-xl">or drop your files</span>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              <SourceButton icon={<Upload size={18} />} label="Upload files" />
              <SourceButton icon={<Youtube size={18} className="text-red-500" />} label="Websites" />
              <SourceButton icon={<Database size={18} className="text-blue-500" />} label="Drive" />
              <SourceButton icon={<FileText size={18} />} label="Copied text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SourceButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex items-center gap-2.5 px-6 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-700 hover:shadow-md hover:border-slate-300 transition-all active:scale-95">
      {icon}
      {label}
    </button>
  );
}
