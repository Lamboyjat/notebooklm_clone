
import React, { useState } from 'react';
import { Notebook } from './types';
import Home from './components/Home';
import NotebookView from './components/NotebookView';
import SourceModal from './components/SourceModal';

const INITIAL_NOTEBOOKS: Notebook[] = [
  {
    id: '1',
    title: 'The Wealth Formula: Automatic Investing...',
    sources: [{ id: 's1', title: 'Wealth Strategy', type: 'web', content: '...' }],
    messages: [],
    updatedAt: Date.now(),
    icon: '🏠',
    bgColor: 'bg-emerald-50'
  },
  {
    id: '2',
    title: 'RECURSIVE LANGUAGE MODELS',
    sources: [],
    messages: [],
    updatedAt: Date.now() - 86400000,
    icon: '🔄',
    bgColor: 'bg-blue-50'
  },
  {
    id: '3',
    title: "Software's Evolution: From Code to AI...",
    sources: [],
    messages: [],
    updatedAt: Date.now() - 172800000,
    icon: '🤖',
    bgColor: 'bg-orange-50'
  }
];

export default function App() {
  const [notebooks, setNotebooks] = useState<Notebook[]>(INITIAL_NOTEBOOKS);
  const [currentNotebookId, setCurrentNotebookId] = useState<string | null>(null);
  const [isSourceModalOpen, setSourceModalOpen] = useState(false);

  const activeNotebook = notebooks.find(n => n.id === currentNotebookId);

  const handleCreateNotebook = () => {
    setSourceModalOpen(true);
  };

  const handleFinishCreate = (title: string, firstSource?: any) => {
    const newId = Date.now().toString();
    const newNotebook: Notebook = {
      id: newId,
      title: title || 'Untitled notebook',
      sources: firstSource ? [firstSource] : [],
      messages: [{
        id: 'welcome',
        role: 'assistant',
        content: `Welcome to your new notebook "${title}". I'm ready to help you analyze your sources.`
      }],
      updatedAt: Date.now(),
      icon: '📓',
      bgColor: 'bg-slate-50'
    };
    setNotebooks([newNotebook, ...notebooks]);
    setCurrentNotebookId(newId);
    setSourceModalOpen(false);
  };

  const updateNotebook = (updated: Notebook) => {
    setNotebooks(prev => prev.map(n => n.id === updated.id ? updated : n));
  };

  if (activeNotebook) {
    return (
      <NotebookView 
        notebook={activeNotebook} 
        onBack={() => setCurrentNotebookId(null)}
        onUpdate={updateNotebook}
      />
    );
  }

  return (
    <>
      <Home 
        notebooks={notebooks} 
        onSelectNotebook={setCurrentNotebookId}
        onCreateNotebook={handleCreateNotebook}
      />
      {isSourceModalOpen && (
        <SourceModal 
          onClose={() => setSourceModalOpen(false)}
          onConfirm={handleFinishCreate}
        />
      )}
    </>
  );
}
