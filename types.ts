
export interface Source {
  id: string;
  title: string;
  type: 'web' | 'pdf' | 'text' | 'youtube' | 'drive';
  content: string;
  summary?: string;
  url?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: string[];
}

export interface Notebook {
  id: string;
  title: string;
  sources: Source[];
  messages: Message[];
  updatedAt: number;
  icon?: string;
  bgColor?: string;
}

export type GuideType = 'audio' | 'video' | 'mindmap' | 'flashcards' | 'quiz' | 'infographic' | 'datatable' | 'slidedeck' | 'report';

export interface Guide {
  id: string;
  type: GuideType;
  title: string;
  content: any;
  createdAt: number;
}
