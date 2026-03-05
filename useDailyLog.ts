import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import type { DailyLog, Intention, InterstitialEntry } from '../types';

export function useDailyLog(userId: string, date: string) {
  const [log, setLog] = useState<DailyLog | null>(null);
  const [intentions, setIntentions] = useState<Intention[]>([]);
  const [entries, setEntries] = useState<InterstitialEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDayData = async () => {
      // 2026 Pro-Tip: Use a single RPC call or grouped Promise to reduce waterfalls
      const { data, error } = await supabase
        .from('daily_logs')
        .select(`
          *,
          intentions (*),
          interstitial_entries (*)
        `)
        .eq('user_id', userId)
        .eq('log_date', date)
        .single();

      if (data) {
        setLog(data);
        setIntentions(data.intentions);
        setEntries(data.interstitial_entries);
      }
      setLoading(false);
    };

    fetchDayData();
  }, [userId, date]);

  return { log, intentions, entries, loading };
}
