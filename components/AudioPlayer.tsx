
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, X } from 'lucide-react';
import * as gemini from '../services/geminiService';

interface AudioPlayerProps {
  text: string;
  onClose: () => void;
}

export default function AudioPlayer({ text, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    const generateAndPlay = async () => {
      try {
        const audioBytes = await gemini.generateAudioOverview(text);
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        const buffer = await gemini.decodeAudioData(audioBytes, audioContextRef.current, 24000, 1);
        
        setIsLoading(false);
        // Autoplay logic if desired, or wait for user
      } catch (e) {
        console.error("Audio failed", e);
        setIsLoading(false);
      }
    };
    
    generateAndPlay();

    return () => {
      sourceNodeRef.current?.stop();
      audioContextRef.current?.close();
    };
  }, [text]);

  const togglePlay = () => {
    if (isPlaying) {
      sourceNodeRef.current?.stop();
      setIsPlaying(false);
    } else {
      // Start playback logic
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-96 bg-white border border-slate-200 rounded-3xl shadow-2xl p-4 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
            <Volume2 size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">Audio Overview</h4>
            <p className="text-[10px] text-slate-500">AI Generated Podcast</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full text-slate-400">
          <X size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-center gap-6">
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <RotateCcw size={20} />
          </button>
          <button 
            onClick={togglePlay}
            disabled={isLoading}
            className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-black transition-transform active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause size={24} fill="white" />
            ) : (
              <Play size={24} fill="white" className="ml-1" />
            )}
          </button>
          <button className="text-slate-400 hover:text-slate-600 transition-colors rotate-180">
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
