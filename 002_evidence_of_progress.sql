-- ============================================================
-- Zenith Notes - Migration 002
-- Phase 2: Evidence of Progress Link
-- ============================================================

-- Add a reference to link the log to the completion
ALTER TABLE intentions 
ADD COLUMN completed_at_entry_id UUID REFERENCES interstitial_entries(id);

-- This allows for the "Evidence of Progress" feature:
-- "You finished Task X while your energy was at an 8/10."
