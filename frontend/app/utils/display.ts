// SOLUTION BELOW FROM CHAT TO FIX JITTERY RELATED LIST SECTION

// create a deterministic hash-like function for a string
export function getHashCode(str: string): number {
  let hash = 0;
  if (str.length === 0) return hash;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // convert to 32bit integer
  }
  return Math.abs(hash);
}

// get random height thats stable for a given item ID
export function getRandomHeight(itemId: string | number): number {
  // convert id to a hash code if its a string
  const idHash = typeof itemId === 'string' ? getHashCode(itemId) : itemId;
  
  // use hash to generate a height bw 12rem and 20rem
  const minHeight = 12;
  const maxHeight = 20;
  const range = maxHeight - minHeight;
  
  // use the hash to determine a deterministic value within the range
  const normalizedHash = (idHash % 100) / 100; // bw 0 and 1
  const height = minHeight + (normalizedHash * range);
  
  return Math.round(height * 10) / 10; // round to 1 decimal place
}

// function that returns a random height (for backward compatibility)
export function getRandomHeightLegacy(): number {
  return Math.floor(Math.random() * 8) + 12; // random height bw 12 and 20
} 
