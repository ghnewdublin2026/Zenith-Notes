// ============================================================
// Zenith Notes - TypeScript Interfaces (Source of Truth)
// Mirrors the PostgreSQL schema with Frontend-only helpers
// ============================================================

// Core User Profile
export interface Profile {
  id: string;
  username: string;
  created_at: string;
}

// The Daily Container
export interface DailyLog {
  id: string;
  user_id: string;
  log_date: string; // ISO Date YYYY-MM-DD
  wind_down_reflection?: string;
  created_at: string;
}

// The "Big 3" Tasks
export interface Intention {
  id: string;
  log_id: string;
  content: string;
  is_completed: boolean;
  priority_rank: 1 | 2 | 3;
  completed_at_entry_id?: string; // Phase 2: Evidence of Progress
}

// Interstitial Logs (The Flow)
export interface InterstitialEntry {
  id: string;
  log_id: string;
  entry_time: string; // ISO Timestamp
  activity_description: string;
  energy_level: number; // 1-10
  mood_tag?: 'focused' | 'foggy' | 'anxious' | 'energized' | 'tired';
}

// Frontend-only: Enriched Daily Log for UI state
export interface DailyLogWithRelations extends DailyLog {
  intentions: Intention[];
  interstitial_entries: InterstitialEntry[];
  isSyncing?: boolean;
}
