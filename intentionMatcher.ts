import type { Intention } from '../types';

/**
 * Finds a matching intention based on user input text.
 * Uses a simple keyword matching approach (Dice's Coefficient-inspired).
 * Phase 3 upgrade: Replace with OpenAI embeddings for semantic matching.
 */
export function findMatchingIntention(
  input: string, 
  intentions: Intention[]
): Intention | null {
  const normalizedInput = input.toLowerCase();
  
  return intentions.find(intent => {
    const words = intent.content.toLowerCase().split(' ');
    // Match if user mentions 2+ keywords from the intention
    const matchCount = words.filter(word => 
      word.length > 3 && normalizedInput.includes(word)
    ).length;
    
    return matchCount >= 2 || normalizedInput.includes(intent.content.toLowerCase());
  }) || null;
}
