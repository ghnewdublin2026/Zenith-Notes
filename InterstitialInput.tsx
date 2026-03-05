import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { InterstitialEntry } from '../types';

interface Props {
  logId: string;
  onEntryAdded: (entry: InterstitialEntry) => void;
}

export const InterstitialInput: React.FC<Props> = ({ logId, onEntryAdded }) => {
  const [text, setText] = useState('');
  const [energy, setEnergy] = useState(5);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newEntry: Partial<InterstitialEntry> = {
      log_id: logId,
      activity_description: text,
      energy_level: energy,
      entry_time: new Date().toISOString(),
    };

    // Optimistic Update: Update UI before server response
    onEntryAdded(newEntry as InterstitialEntry);
    setText('');
    setEnergy(5); // Reset slider to neutral

    setIsSyncing(true);
    const { error } = await supabase.from('interstitial_entries').insert([newEntry]);
    if (error) console.error("Sync failed:", error);
    setIsSyncing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col gap-3">
        {/* Energy Slider */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Energy</span>
          <input 
            type="range" min="1" max="10" 
            value={energy} 
            onChange={(e) => setEnergy(parseInt(e.target.value))}
            className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <span className={`text-sm font-bold w-6 ${energy > 7 ? 'text-green-500' : energy < 4 ? 'text-orange-500' : 'text-indigo-500'}`}>
            {energy}
          </span>
        </div>

        {/* Text Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="What just happened? What's next?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full pl-4 pr-12 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-indigo-500 outline-none text-zinc-900 dark:text-zinc-100"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1.5 p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
      {isSyncing && <p className="text-[10px] text-zinc-400 mt-2 italic">Syncing to your cloud...</p>}
    </form>
  );
};
