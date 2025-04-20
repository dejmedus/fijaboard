// to generate a random height for masonry grid items
export function getRandomHeight(min = 10, max = 30) {
  return Math.floor(Math.random() * (max - min + 1) + min);
} 
